class ProductsDatabase {
    constructor() {
        this.database = [];
    };

    getAllItems() {
        return this.database;
    };

    getItemId(id) {
        const item = this.database.find(ele => ele.id === id);
        if(!item) {
            throw new Error(`item con id ${id} no encontrado`)
        }
        return item;
    }

    saveItem(item) {
        this.database.push(item);
    };
};

module.exports = ProductsDatabase;