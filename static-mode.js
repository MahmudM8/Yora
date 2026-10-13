// static-mode.js — TEMPORARY egress saver for Yora.
//
// HOW TO USE: in index.html, restaurants.html and restaurant.html, add these two lines
// right AFTER the line that loads Supabase (<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>):
//
//   <script src="menu-data.js"></script>
//   <script src="static-mode.js"></script>
//
// No other change is needed in your pages. Restaurants and menus are read from menu-data.js
// instead of Supabase. Login, orders and everything else still use Supabase as normal.
//
// TO GO BACK TO NORMAL: set USE_STATIC_DATA = false below (or delete the two lines from the pages).

const USE_STATIC_DATA     = true;   // true = restaurants/menus come from menu-data.js, false = Supabase as before
const SHOW_COVER_IMAGES   = true;   // restaurant cover photos (6 files from your /covers folder)
const SHOW_PRODUCT_IMAGES = false;  // menu item photos. Keep false: emojis show instead (saves the most egress)

(function () {
  if (!USE_STATIC_DATA) return;
  if (typeof YORA_DATA === 'undefined' || !window.supabase || !window.supabase.createClient) {
    console.warn('[static-mode] menu-data.js or Supabase did not load, so Supabase is used as normal.');
    return;
  }

  const staticBizIds = new Set(YORA_DATA.businesses.map(b => String(b.id)));
  const bizRows  = () => YORA_DATA.businesses.map(b => Object.assign({}, b, { cover_image_url: SHOW_COVER_IMAGES ? b.cover_image_url : null }));
  const prodRows = () => YORA_DATA.products.map(p => Object.assign({}, p, { image_url: SHOW_PRODUCT_IMAGES ? p.image_url : null }));

  // A tiny stand-in for sb.from('businesses' | 'products') that answers from menu-data.js
  function Query(real, table) {
    this.real = real; this.table = table;
    this.cols = '*'; this.filters = []; this.orders = []; this.max = null; this.one = false;
  }
  Query.prototype.select = function (cols) { this.cols = cols || '*'; return this; };
  Query.prototype.eq = function (c, v) { this.filters.push([c, v]); return this; };
  Query.prototype.order = function (c, o) { this.orders.push([c, !(o && o.ascending === false)]); return this; };
  Query.prototype.limit = function (n) { this.max = n; return this; };
  Query.prototype.single = function () { this.one = 'single'; return this; };
  Query.prototype.maybeSingle = function () { this.one = 'maybe'; return this; };
  // Writes (insert/update/delete) always go to the real Supabase
  ['insert', 'update', 'delete', 'upsert'].forEach(function (m) {
    Query.prototype[m] = function () { const t = this.real.from(this.table); return t[m].apply(t, arguments); };
  });
  Query.prototype.then  = function (ok, fail) { return this.run().then(ok, fail); };
  Query.prototype.catch = function (fail) { return this.run().catch(fail); };

  // Same query, sent to the real Supabase
  Query.prototype.passthrough = function () {
    let q = this.real.from(this.table).select(this.cols);
    this.filters.forEach(function (f) { q = q.eq(f[0], f[1]); });
    this.orders.forEach(function (o) { q = q.order(o[0], { ascending: o[1] }); });
    if (this.max != null) q = q.limit(this.max);
    if (this.one === 'single') q = q.single(); else if (this.one) q = q.maybeSingle();
    return q;
  };

  // Homepage lists all categories: keep pharmacies/stores/delivery from Supabase, restaurants from menu-data.js
  Query.prototype.realOtherCategories = async function () {
    try {
      let q = this.real.from('businesses').select(this.cols);
      this.filters.forEach(function (f) { q = q.eq(f[0], f[1]); });
      const res = await q;
      return (res.data || []).filter(function (r) { return r.category !== 'restaurant'; });
    } catch (e) { return []; }
  };

  Query.prototype.run = async function () {
    const f = this.filters;
    const idEq  = f.find(function (x) { return x[0] === 'id'; });
    const bizEq = f.find(function (x) { return x[0] === 'business_id'; });
    const catEq = f.find(function (x) { return x[0] === 'category'; });
    let rows;

    if (this.table === 'products') {
      if (bizEq && !staticBizIds.has(String(bizEq[1]))) return this.passthrough();
      rows = prodRows();
    } else {
      if (idEq && !staticBizIds.has(String(idEq[1]))) return this.passthrough();
      if (idEq || (catEq && catEq[1] === 'restaurant')) rows = bizRows();
      else rows = (await this.realOtherCategories()).concat(bizRows());
    }

    rows = rows.filter(function (r) { return f.every(function (x) { return String(r[x[0]]) === String(x[1]); }); });

    const orders = this.orders;
    if (orders.length) {
      rows = rows.slice().sort(function (a, b) {
        for (const o of orders) {
          let x = a[o[0]], y = b[o[0]];
          if (x == null) x = typeof y === 'number' ? 0 : '';
          if (y == null) y = typeof x === 'number' ? 0 : '';
          const d = (typeof x === 'number' && typeof y === 'number') ? x - y : String(x).localeCompare(String(y));
          if (d) return o[1] ? d : -d;
        }
        return 0;
      });
    }
    if (this.max != null) rows = rows.slice(0, this.max);

    if (this.one) {
      const row = rows[0] || null;
      return { data: row, error: (row || this.one === 'maybe') ? null : { message: 'Row not found' } };
    }
    return { data: rows, error: null };
  };

  // Wrap createClient so every page's `sb` uses the stand-in for businesses/products only
  const realCreate = window.supabase.createClient;
  const wrapped = function () {
    const real = realCreate.apply(window.supabase, arguments);
    return new Proxy(real, {
      get: function (target, prop) {
        if (prop === 'from') {
          return function (table) {
            return (table === 'businesses' || table === 'products') ? new Query(real, table) : real.from(table);
          };
        }
        const v = Reflect.get(target, prop, target);
        return typeof v === 'function' ? v.bind(target) : v;
      }
    });
  };
  const patched = Object.assign({}, window.supabase, { createClient: wrapped });
  try { window.supabase = patched; }
  catch (e) { Object.defineProperty(window, 'supabase', { value: patched, configurable: true, writable: true }); }

  // If a cover photo is missing, hide the broken image instead of showing a broken icon
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.target.style.display = 'none';
  }, true);
})();