const { Router } = require("express");
const productsRouter = require("./products.router");
const cartRouter = require("./cart.router");

const router = Router();

router.use('/mockingproducts', productsRouter);
router.use('/mockingproducts/cart', cartRouter);

module.exports = router;