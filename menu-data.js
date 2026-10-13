// menu-data.js — TEMPORARY static data for Yora restaurants.
// Load this BEFORE static-mode.js. When your billing cycle resets, set USE_STATIC_DATA = false in static-mode.js.
//
// To change a price, edit the number. To remove an item, delete its line.
// Each item is written as: ["Name", price, "optional description"]

// ── WhatsApp number that receives the orders (same number for all restaurants for now) ──
// To give one restaurant its own number, add a line to YORA_WA, e.g.  "babz": "08012345678"
const YORA_WA_DEFAULT = "07047557067";
const YORA_WA = {};

const YORA_DATA = (() => {
  // Cover photos live in a /covers folder next to your HTML files, e.g. covers/fasnet.jpg
  const biz = (id, name, description, emoji) => ({
    id, name, category: "restaurant", description,
    logo_emoji: emoji, cover_emoji: emoji,
    cover_image_url: "covers/" + id + ".jpg",
    rating: null, order_count: 0,
    is_open: true, is_approved: true,
    opening_time: null, closing_time: null, address: null,
    whatsapp_number: YORA_WA[id] || YORA_WA_DEFAULT,
    delivery_fee: 0, offers_delivery: true, offers_pickup: true, reservations_enabled: false
  });

  const businesses = [
    biz("fasnet", "Fasnet Restaurant", "Burgers, pizza, pasta, shawarma, rice dishes, breakfast, desserts and more.", "🍔"),
    biz("babz", "Babz Lounge", "Mocktails, milkshakes, suya, rice dishes, burgers and fresh juice.", "🍹"),
    biz("yahuza", "Yahuza Suya", "Freshly grilled suya and masa.", "🍢"),
    biz("arewa-crave", "Arewa Crave", "Northern favourites, rice and stew, shawarma and cool drinks.", "🍛"),
    biz("cravins", "Cravins", "Milkshakes, shawarma, ice cream, cakes and pastries.", "🍦"),
    biz("alfred-shawarma", "Alfred Shawarma", "Quick, tasty shawarma.", "🌯")
  ];

  const products = [];
  const add = (b, category, emoji, items) => items.forEach(([name, price, description]) =>
    products.push({
      id: b + "-" + (products.length + 1), business_id: b,
      name, description: description || "", price, emoji,
      image_url: null, category, is_available: true
    }));

  // ───────────── FASNET RESTAURANT ─────────────
  add("fasnet", "Burger", "🍔", [
    ["Classic Chicken", 6500], ["Classic Beef", 6500], ["Crispy Chicken", 7200], ["Mozzarella Cheese", 8000],
    ["Double Deck", 9000], ["Double Deck Crispy Chicken", 9000], ["Triple Maxxx Cheese", 10500], ["Fries", 4500]
  ]);
  add("fasnet", "Soup", "🍲", [
    ["Chicken Pepper", 6000], ["Goat Meat Pepper", 6500], ["Assorted Pepper", 5000]
  ]);
  add("fasnet", "Swallow", "🥣", [
    ["Semovita with Egusi", 6000], ["Semovita with Ogbono", 6000], ["Semovita with Vegetable", 6000]
  ]);
  add("fasnet", "Protein", "🍗", [
    ["Chicken", 3500], ["Beef", 3500], ["Fish", 4500]
  ]);
  add("fasnet", "Starters", "🍟", [
    ["Loaded Fries", 9500], ["Honey Garlic Chicken Tenders", 8000], ["Crispy Wings", 6000], ["Hot Wings", 5500],
    ["Honey Wings", 6500], ["Chicken Quesadillas", 8000], ["Chicken/Beef Tacos", 7500], ["Pizza Sofficini", 7500],
    ["Samosa", 5800], ["Spring Roll", 5800], ["Popcorn Chicken", 6000], ["Corndogs", 7500], ["Cheese Tacos", 9500]
  ]);
  add("fasnet", "Salads", "🥗", [
    ["Caesar", 7500], ["Mix Veggies", 11500], ["Green", 5000], ["Chinese Chicken", 8000],
    ["Grilled Beef Salad", 7500], ["House Salad", 11000]
  ]);
  add("fasnet", "Breakfast", "🍳", [
    ["Ultimate", 11500, "Sliced bread, baked beans, egg, sausage, crispy wings, waffles, roasted tomato & tea"],
    ["English", 11000, "Sliced bread, baked beans, sausage, mushroom, egg, grilled beef & cappuccino"],
    ["American", 11500, "Pancake, roasted tomato, sausage, egg, baked beans & coffee"],
    ["Fasnet", 14000, "Chicken club sandwich, egg, baked beans, mushroom, sausage, roasted tomato, sliced bread, crispy wings & cappuccino"]
  ]);
  add("fasnet", "Mocktails", "🍹", [
    ["Cucumber Mint Cooler", 5000], ["Strawberry Freeze", 6700], ["Watermelon Freeze", 6700],
    ["Vanilla Espresso Martini", 6700], ["Orange Mojito", 5200], ["Watermelon Mojito", 5500], ["Virgin Mojito", 4500],
    ["Blue Lagoon", 4200], ["Chapman", 4200], ["Pina Colada", 6700], ["Pineapple Ginger Spritz", 6700],
    ["Strawberry Daiquiri", 6800], ["Pineapple Daiquiri", 6800], ["Frenzy Chapman", 5000], ["Blue Hawaii", 6500],
    ["Pineapple Smoothie", 5700], ["Pineapple Banana Smoothie", 6700], ["Mixed Fruit Smoothie", 7700]
  ]);
  add("fasnet", "Drinks", "🥤", [
    ["Slush", 3000], ["Coke", 800], ["Fanta", 800], ["Sprite", 800], ["Water", 700], ["Maltina Can", 1200], ["Exotic Can", 1500]
  ]);
  add("fasnet", "Pasta", "🍝", [
    ["Marry Me", 13500], ["Fiesta with Cheesy Escalope", 12500], ["Chinese Vegetarian", 9000], ["Chicken Alfredo", 11500],
    ["Stirfry Beef/Chicken", 8500], ["Pasta with Meat Balls", 9500], ["Chicken Fajita", 12000], ["Singapore Noodles", 8500],
    ["Bolognese", 8500], ["Penne Arrabiata", 8000]
  ]);
  add("fasnet", "Pizza", "🍕", [
    ["Italian Margherita", 13000], ["Vegetarian", 14500], ["Chicken", 16500], ["Beef", 16500], ["BBQ Chicken", 17500],
    ["Chef’s Special", 18500], ["Hawaiian", 18500], ["Fasnet Special", 21000], ["Extra Cheese", 5000]
  ]);
  add("fasnet", "Desserts", "🍨", [
    ["Cake & Ice Cream", 7500], ["Banana Split", 6500], ["Ice Cream Parfait", 6000], ["Waffle Sandwich", 8000],
    ["Waffles & Ice Cream", 8500], ["Bubble Waffle", 9500]
  ]);
  add("fasnet", "Milkshakes", "🥛", [
    ["Blueberry", 7500], ["Blueberry Banana", 8500], ["Fasnet", 8000], ["Chocolate", 6500], ["Oreo", 6500], ["Vanilla", 6500],
    ["Banana", 6500], ["Strawberry", 7000], ["Strawberry Banana", 7500], ["Vanilla Caramel", 7000], ["Oreo Frappuccino", 7000]
  ]);
  add("fasnet", "Hot Beverages", "☕", [
    ["Hot Chocolate", 6500], ["Cappuccino", 4000], ["Tea", 2000], ["Coffee", 3000], ["Arabian Tea", 5000], ["Chai Tea", 6500]
  ]);
  add("fasnet", "Mains", "🍛", [
    ["Mashed Potato & Grilled Chicken", 14500], ["Teriyaki Beef Sauce with Egg Rice", 13500], ["Biryani Chicken Pot", 12500],
    ["Spicy Beef Noodles", 7500], ["Naan Bread and Butter Chicken", 11500], ["Mongolian Beef Sauce with White Rice", 11500],
    ["Sweet Chilli Rice with Grilled Chicken and Pine Veggies", 13500], ["Schezwan Fried Rice and Chicken Sauce", 13000],
    ["Basmati White Rice with Shredded Chicken Sauce", 11000], ["Singapore Rice with Chicken in Chili Sauce", 12000],
    ["Crispy Chilli Beef Sauce with Basmati White Rice", 12000], ["Chicken Fried Rice with Chicken in Oyster Sauce", 12000],
    ["Fasnet Rice with Grilled Chicken and Veggies", 12500], ["Mexican Rice with Grilled Chicken and Veggies", 11500],
    ["Chinese Fried Rice with Chinese Chicken", 11500], ["Pineapple Fried Rice with Sweet & Sour Sauce", 12000],
    ["Egg Sausage Fried Rice with Honey Chicken & Pineapple", 11500], ["Tori Katsu with Dirty Rice", 11000],
    ["Jollof/Fried Rice & Grilled Chicken (Option of Plantain)", 7200], ["Fries with Fried Chicken", 8500],
    ["Noodles & Omelette with Fried Chicken", 8500]
  ]);
  add("fasnet", "Shawarma", "🌯", [
    ["Chicken", 5000], ["Beef", 5000], ["Garlic", 5500], ["Cheese", 6500], ["Chicken Wrap", 6000], ["Fasnet", 7000]
  ]);
  add("fasnet", "Sandwich", "🥪", [
    ["Philadelphia", 7000], ["Chicken Club", 6500], ["Crispy Chicken", 7500], ["Fajita", 7000]
  ]);
  add("fasnet", "Barbecue", "🍖", [
    ["Wings", 6500], ["Chicken", 6000], ["Chicken Kebab", 6000],
    ["Full Grilled Chicken & Fries", 25000], ["Full Grilled Fish with Fries", 25000]
  ]);

  // ───────────── BABZ LOUNGE ─────────────
  add("babz", "Mocktail", "🍹", [
    ["Babz Special Chapman", 4000], ["Virgin Mojito", 3000], ["Virgin Pina Colada", 5000],
    ["Frozen Strawberry Mint Daiquiri", 4000], ["Pink Lady", 5000], ["Watermelon Blast", 4000], ["Sunrise", 4000],
    ["Strawberry Mojito", 5000], ["Frozen Mint Lemonade", 4000], ["Lemonade", 3500]
  ]);
  add("babz", "Milk Shake", "🥛", [
    ["Babz Oreo Musled", 5000], ["Death by Chocolate", 5000], ["Babz Special Milkshake", 5000],
    ["Strawberry Milkshake", 5000], ["Banana Milkshake", 5000], ["Vanilla Milkshake", 5000]
  ]);
  add("babz", "Smoothies", "🥤", [
    ["Strawberry Smoothie", 5000], ["Banana Smoothie", 5000], ["Babz Special Smoothie", 5000]
  ]);
  add("babz", "Soft Drinks", "🥤", [
    ["Faro Water", 500], ["Coke", 1000], ["Fanta", 1000], ["Sprite", 1000], ["Maltina", 1200], ["Malta Guinness", 1200]
  ]);
  add("babz", "Fresh Juice", "🍊", [
    ["Fresh Orange Juice", 4000], ["Fresh Pineapple Juice", 4000], ["Fresh Watermelon Juice", 4000], ["Mixed Juice", 4000]
  ]);
  add("babz", "Babz Arab Tea", "☕", [
    ["Small Jug", 2000], ["Big Jug", 2500]
  ]);
  add("babz", "Non-Alcoholic Wine", "🍷", [
    ...["Eva", "Pure Heaven", "Toma", "Toma Premium", "Chamdor", "J/W"]
      .flatMap(w => [[w + " (Glass)", 2000], [w + " (Bottle)", 9000]]),
    ["Wine Glass Cup", 2000]
  ]);
  add("babz", "Sandwich Burger", "🍔", [
    ["Beef Burger", 5000], ["Babz Chicken Signature Burger", 6000], ["Chicken Burger", 5000],
    ["Chicken Shawarma Without Sausage", 4000], ["Chicken Shawarma With Sausage", 4500],
    ["Beef Shawarma With Sausage", 4000], ["Beef Shawarma Without Sausage", 3500],
    ["Beef Pizza", 10000], ["Chicken Pizza", 10000]
  ]);
  add("babz", "Rice Dish", "🍚", [
    ["Special Fried Rice", 6500, "Served with chicken or beef"],
    ["Party Jollof Rice", 6000, "Served with chicken or beef"],
    ["Chicken Fried Rice", 7000, "Served with chicken or beef"],
    ["Babz Special Fried Rice", 6500, "Served with chicken or beef"],
    ["White Rice and Stew", 7000, "Served with chicken or beef"]
  ]);
  add("babz", "Take Away", "🥡", [
    ["Food Take Away", 500], ["Shakes Take Away", 300], ["Ram Take Away", 300]
  ]);
  add("babz", "Suya", "🍢", [
    ["Full Chicken Suya", 10000], ["Half Chicken Suya", 5000], ["Ram Meat", 4000], ["Gas Meat", 4000],
    ["Gizzard", 2000], ["Kidney Sauce", 4000]
  ]);
  add("babz", "Sides", "🍟", [
    ["Chips Only", 3000], ["Chips and Egg", 4000], ["Chicken Part Only", 3500], ["Beef Kebab Only", 3000],
    ["Chips & Chicken", 6500], ["Chips & Kebab", 6000], ["Egg", 1000]
  ]);
  add("babz", "Noodles", "🍜", [
    ["Stir Fried Noodles", 4000], ["Babz Special Noodles", 5000], ["Chicken Noodles", 5000], ["Jollof Noodles", 4000]
  ]);
  add("babz", "Salads", "🥗", [
    ["Vegetable Salad", 3000], ["Coleslaw Salad", 2500]
  ]);
  add("babz", "Pepper Protein", "🌶️", [
    ["Pepper Chicken", 5000], ["Pepper Beef", 5000], ["Pepper Goat Meat", 5000]
  ]);
  add("babz", "Pepper Soup", "🍲", [
    ["Goat Meat Pepper Soup", 4500], ["Chicken Pepper Soup", 4500]
  ]);
  add("babz", "Tilapia Fish", "🐟",
    Array.from({ length: 15 }, (_, i) => {
      const p = 5000 + i * 1000;
      return ["Tilapia Fish (₦" + p.toLocaleString("en-US") + ")", p, "Priced by size"];
    })
  );

  // ───────────── YAHUZA SUYA ─────────────
  add("yahuza", "Suya", "🍢", [
    ["Chicken Part", 3000], ["Beef Stick", 1000], ["Kidney Stick", 1000], ["Liver Stick", 1000], ["Gizzard Stick", 1000]
  ]);
  add("yahuza", "Sides", "🍞", [
    ["Masa", 500]
  ]);

  // ───────────── AREWA CRAVE ─────────────
  add("arewa-crave", "Food", "🍛", [
    ["Masa", 1000], ["Awara", 1000], ["Gurasa", 1000], ["Akara Kosai", 1000], ["Dan Wake", 2000],
    ["Rice and Stew", 3000], ["Shawarma", 3500], ["Chips and Eggs", 4000], ["Yam and Eggs", 3000],
    ["Plantain and Eggs", 3000], ["Loaded Fries", 6000], ["Garau Garau", 2000], ["Pasta", 3000], ["Cow Tail", 4000]
  ]);
  add("arewa-crave", "Drinks", "🥤", [
    ["Ice Coffee", 2000], ["Coconut Milk", 2000], ["Slush", 1500], ["Smoothie", 2000], ["Zobo", 1000], ["Kunun Aya", 1000]
  ]);

  // ───────────── CRAVINS ─────────────
  add("cravins", "Milkshake", "🥛", [
    ["Classic Vanilla", 5200], ["Classic Chocolate", 5200], ["Classic Strawberry", 5200],
    ["Magic Madness Oreo", 5600], ["Triple Madness Lotus Biscoff", 6000], ["Triple Madness Triple Chocolate", 6000]
  ]);
  add("cravins", "Shawarma", "🌯", [
    ["Beef Shawarma", 3500], ["Chicken Shawarma", 3800], ["Add Sausage", 450, "Add to any shawarma"]
  ]);
  add("cravins", "Muffin", "🧁", [
    ["Muffin Cake", 1300]
  ]);
  add("cravins", "Samosa", "🥟", [
    ["Samosa", 350, "Single"]
  ]);
  add("cravins", "Ice Cream", "🍦", [
    ["1 Scoop Cup", 1000], ["2 Scoop Cup", 2000], ["3 Scoop Cup", 3000], ["4 Scoop Cup", 4000],
    ["Add Waffle", 400, "Add to any ice cream"], ["Add Topping", 350, "Add to any ice cream"]
  ]);
  add("cravins", "Drinks", "🥤", [
    ["Bottle Water", 350], ["Coke", 600], ["Fanta", 600], ["Malt", 800], ["Predator", 800],
    ["Schweppes", 700], ["Smoov", 500], ["Sprite", 700]
  ]);
  add("cravins", "Cakes & Pastries", "🍰", [
    ["Bento Cake", 4100], ["Chocolate Cake", 2700], ["Red Velvet Cake", 2700], ["Vanilla Cake", 2700],
    ["Doughnut", 1300], ["Meat Pie", 900], ["Popcorn", 950]
  ]);

  // ───────────── ALFRED SHAWARMA ─────────────
  add("alfred-shawarma", "Shawarma", "🌯", [
    ["Shawarma Without Sausage", 1200], ["Shawarma With Sausage", 1500], ["Double Shawarma with Sausage", 1700]
  ]);

  return { businesses, products };
})();