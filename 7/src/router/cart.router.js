const { Router } = require("express");
const errorTypes = require("../errors/index.errors.js");
const { cartDatabase, productsDatabase } = require("../database/index.js");

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try {
        const carts = await cartDatabase.getCart();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: errorTypes.INTENARL_SERVER_ERROR, error: error.message });
    };
});

cartRouter.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: errorTypes.INVALID_VOID_ID });
        const item = await productsDatabase.getItemId(id);
        if (!item) return res.status(400).json({ message: errorTypes.INVALID_WRONG_ID })
        await cartDatabase.saveCart(item);
        res.status(201).send({ message: 'Item agregado correctamente' });
    } catch (error) {
        res.status(500).json({ message: errorTypes.INTENARL_SERVER_ERROR, error: error.message });
    };
});

module.exports = cartRouter;