const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const products = [
    {
        id: 1,
        name: "mouse",
        price: "14.490"
    },
    {
        id: 2,
        name: "keyboard",
        price: "19.490"
    },
    {
        id: 3,
        name: "monitor",
        price: "114.490"
    },
    {
        id: 4,
        name: "speaker",
        price: "34.490"
    },
    {
        id: 5,
        name: "mouse-pad",
        price: "4.490"
    },
    {
        id: 6,
        name: "headset",
        price: "64.490"
    }
]

app.get("/products", (req, res) => {
    const limit = parseInt(req.query.limit) || products.length;
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
});
//http://localhost:3001/products?limit=x

app.get("/products/:idProduct", (req, res) => {
    const { idProduct } = req.params;
    const productById = products.find(ele => ele.id === parseInt(idProduct));
    productById ? res.json(productById) : res.send("No existen productos con el id " + idProduct)
});
//http://localhost:3001/products/x

app.use("*", (req, res) => {
    res.send("pagina no encontrada")
})

app.listen(port, () => console.log("Server start on port " + port));