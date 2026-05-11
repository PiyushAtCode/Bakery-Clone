const sampleProducts = [
  {
    name: "Classic Choco-Chip",
    price: 60,
    category: "Cookies",
    description: "Crispy edges with a soft, chewy center and loaded with dark chocolate chips.",
    image: { filename: "cookie_01", url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=500" }
  },
  {
    name: "Red Velvet Dream",
    price: 45,
    category: "Cakes",
    description: "A rich, velvety cocoa-based cake topped with smooth cream cheese frosting.",
    image: { filename: "cake_01", url: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=500" }
  },
  {
    name: "Buttery Croissant",
    price: 25,
    category: "Pastries",
    description: "Flaky, golden-brown layers made with 100% French butter.",
    image: { filename: "pastry_01", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500" }
  },
  {
    name: "Oatmeal Raisin",
    price: 10,
    category: "Cookies",
    description: "Healthy oats paired with sweet sun-dried raisins and a hint of cinnamon.",
    image: { filename: "cookie_02", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500" }
  },
  {
    name: "Dark Truffle Box",
    price: 120,
    category: "Chocolates",
    description: "Handcrafted 70% dark chocolate truffles with a silky ganache center.",
    image: { filename: "choco_01", url: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=500" }
  },
  {
    name: "Almond Biscotti",
    price: 15,
    category: "Biscuits",
    description: "Twice-baked Italian biscuits, perfect for dipping in coffee.",
    image: { filename: "biscuit_01", url: "https://images.unsplash.com/photo-1557089706-68d02dbda277?q=80&w=500" }
  },
  {
    name: "Blueberry Cheesecake",
    price: 55,
    category: "Cakes",
    description: "Creamy New York style cheesecake topped with fresh blueberry compote.",
    image: { filename: "cake_02", url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500" }
  },
  {
    name: "Apple Turnover",
    price: 30,
    category: "Pastries",
    description: "Puff pastry filled with spiced Granny Smith apples.",
    image: { filename: "pastry_02", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGc_pezs-OwvDJBUVP1Bz_SPH97SUqCBIYoT1Q3svmUaxS_bTGOJYrRp86EexWDXL_0Wy78Eu3UpXuNOaIa43aJUwywuy7kYFCc15C6-Y&s=10" }
  },
  {
    name: "White Chocolate Macadamia",
    price: 14,
    category: "Cookies",
    description: "Sweet white chocolate chunks and roasted macadamia nuts.",
    image: { filename: "cookie_03", url: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=500" }
  },
  {
    name: "Hazelnut Praline",
    price: 85,
    category: "Chocolates",
    description: "Crunchy hazelnut core covered in milk chocolate.",
    image: { filename: "choco_02", url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=500" }
  },
  {
    name: "Cookie Cartel- Chocolate-Chip Cookie",
    price: 100,
    category: "Cookies",
    description: "Traditional spiced cookie decorated with royal icing.",
    image: { filename: "cookie_04", url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQcJwi8ogI8AL1kbp_1Q2kkhB4PGHp4L0MhDtv6YRKP1BbDiOOfNDvseHMS0WXGNapRUQXYcuLOoV1cg7mUSy7x9Ayk-ay8QNH5vsC5TinBqQ7DEfwkFaZdmZ4" }
  },
  {
    name: "Death by Chocolate",
    price: 60,
    category: "Cakes",
    description: "Triple layer chocolate cake with chocolate fudge icing.",
    image: { filename: "cake_03", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500" }
  },
  {
    name: "Lemon Tart",
    price: 28,
    category: "Pastries",
    description: "Zesty lemon curd in a shortcrust pastry shell.",
    image: { filename: "pastry_03", url: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=500" }
  },
  {
    name: "Digestive Whole Wheat",
    price: 150,
    category: "Biscuits",
    description: "High-fiber biscuits made with whole grain flour.",
    image: { filename: "biscuit_02", url: "https://tiimg.tistatic.com/fp/1/007/914/made-from-whole-wheat-bran-nutrichoice-digestive-high-fiber-biscuits-424.jpg" }
  },
  {
    name: "Salted Caramel Bar",
    price: 140,
    category: "Chocolates",
    description: "Smooth caramel with a pinch of sea salt, coated in dark chocolate.",
    image: { filename: "choco_03", url: "https://images.unsplash.com/photo-1582176604856-e824b4736522?q=80&w=500" }
  },
  {
    name: "Eclair de Vanille",
    price: 35,
    category: "Pastries",
    description: "Choux pastry filled with vanilla bean custard and topped with chocolate fondant.",
    image: { filename: "pastry_04", url: "https://images.unsplash.com/photo-1612201142855-7873bc1661b4?q=80&w=500" }
  },
  {
    name: "Shortbread Rounds",
    price: 150,
    category: "Biscuits",
    description: "Rich, buttery, and crumbly traditional Scottish recipe.",
    image: { filename: "biscuit_03", url: "https://scottishscran.com/wp-content/uploads/2024/12/Shortbread-Rounds-Recipe-18.jpg" }
  },
  {
    name: "Carrot Cake",
    price: 40,
    category: "Cakes",
    description: "Spiced cake with fresh carrots, walnuts, and cream cheese topping.",
    image: { filename: "cake_04", url: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=500" }
  },
  {
    name: "Milk Chocolate Bark",
    price: 75,
    category: "Chocolates",
    description: "Thin sheets of premium milk chocolate topped with roasted almonds.",
    image: { filename: "choco_04", url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500" }
  },
  {
    name: "Pain au Chocolat",
    price: 32,
    category: "Pastries",
    description: "Classic French pastry with two sticks of dark chocolate inside.",
    image: { filename: "pastry_05", url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=500" }
  },
  {
    name: "Pineapple Cream Cake",
    price: 350,
    category: "Cakes",
    description: "Classic Indian bakery style soft sponge cake with whipped cream and pineapple chunks.",
    image: { filename: "pineapple_cake", url: "https://spoorthycuisine.com/wp-content/uploads/2021/06/pineapple-cake-1024x704.jpg" }
  },
  {
    name: "Masala Veg Puff",
    price: 140,
    category: "Pastries",
    description: "Crispy, flaky triangle pastry filled with spicy mashed potatoes and green peas.",
    image: { filename: "veg_puff", url: "https://spicecravings.com/wp-content/uploads/2019/01/Vegetable-Curry-Puff-1.jpg" }
  },
  {
    name: "Chocolate Truffle Pastry",
    price: 50,
    category: "Pastries",
    description: "Single serving of rich chocolate cake layered with dark chocolate ganache.",
    image: { filename: "choco_pastry", url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500" }
  },
  {
    name: "Premium Fruit Rusk",
    price: 80,
    category: "Biscuits",
    description: "Twice-baked crunchy toast with a hint of cardamom and fennel, perfect for chai.",
    image: { filename: "rusk_toast", url: "https://backup.monkeyit.in/wp-content/uploads/2023/07/DSC_0869-1.jpg" }
  },
  {
    name: "Coconut Cookies (Nankhatai)",
    price: 100,
    category: "Cookies",
    description: "Traditional Indian shortbread cookies that melt in your mouth.",
    image: { filename: "nankhatai", url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500" }
  },
  {
    name: "Milk Rusk",
    price: 60,
    category: "Biscuits",
    description: "Classic crunchy milk toast - the best companion for your morning tea.",
    image: { filename: "milk_rusk", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500" }
  }
];

module.exports = { data: sampleProducts };