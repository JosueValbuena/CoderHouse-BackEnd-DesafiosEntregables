const { Router } = require("express");
const productsRouter = require("./products.router");

const router = Router();

router.use('/mockingproducts', productsRouter);

module.exports = router;