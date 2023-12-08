const { Router } = require("express");
const createProducts = require("../utils/products.js");
const ProductsDatabase = require("../database/products.js");
const errorTypes = require("../errors/index.errors.js");

const productsRouter = Router();
const productsDatabase = new ProductsDatabase();

productsRouter.get('/', async (req, res) => {
    const product = await productsDatabase.getAllItems();
    res.send({ message: `Hay ${product.length} productos en la base de datos`, payload: product });
})

productsRouter.post('/', async (req, res) => {
    try {
        function validateProducts(item, index) {
            if (!item.id || !item.name || !item.department || !item.price) {
                return res.status(400).json({ message: errorTypes.INVALID_OBJECT });
            };
        };

        for (let i = 0; i < 100; i++) {
            const products = createProducts();
            validateProducts(products, i);
            await productsDatabase.saveItem(products);
        };

        res.send('productos agregados correctamente');
    } catch (error) {
        res.status(500).json({ message: errorTypes.INTENARL_SERVER_ERROR, error: error.message });
    }
});

module.exports = productsRouter;