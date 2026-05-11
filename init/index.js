// Here First Time Enter Data SampleData to Local Storage

const mongoose = require("mongoose");
const initData = require("./data.js");
const Product = require("../models/product.js");

main().then(() => console.log("Data Inserted...")).catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://localhost:27017/BakeryApp');
};


const initDB = async () => {
  await Product.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj , owner:"69e9feff00f45f5f0d31a937"}));

  let data  =  await Product.insertMany(initData.data);
  console.log(data);
  console.log("Data was initialized");
};

initDB();


    