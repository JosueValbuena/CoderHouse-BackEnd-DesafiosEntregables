class CartDatabase {
    constructor() {
        this.cart = [];
    };

    getCart() {
        return this.cart;
    };

    saveCart(item) {
        this.cart.push(item);
    }
};

module.exports = CartDatabase;