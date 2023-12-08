class ProductsDatabase {
    constructor() {
        this.database = [];
    };

    getAllItems() {
        return this.database;
    };

    saveItem(item) {
        this.database.push(item);
    };
};

module.exports = ProductsDatabase;