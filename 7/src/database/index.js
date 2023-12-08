const CartDatabase = require("./cart");
const ProductsDatabase = require("./products");

const productsDatabase = new ProductsDatabase();
const cartDatabase = new CartDatabase();

module.exports = {
    productsDatabase,
    cartDatabase
};