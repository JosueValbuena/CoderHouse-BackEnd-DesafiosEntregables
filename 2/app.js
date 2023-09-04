const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, stock) => {

        const id = this.products.length + 1;

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code: `${id}-${title}`,
            stock
        }
        this.products.push(product)
        fs.writeFileSync("products.txt", JSON.stringify(this.products));
    }

    getProducts() {
        const allProductos = JSON.parse(fs.readFileSync("products.txt", "utf-8"));
        return allProductos;
    }

    getProductById(id) {
        const allProductos = JSON.parse(fs.readFileSync("products.txt", "utf-8"));
        const productById = allProductos.find(ele => ele.id === id);
        return productById;
    }

    updateProductById(id, title, description, price, thumbnail, stock) {
        const allProductos = JSON.parse(fs.readFileSync("products.txt", "utf-8"));
        const updateProductById = allProductos.map(ele => ele.id === id ?
            { id, title, description, price, thumbnail, stock } : ele);
        fs.writeFileSync("products.txt", JSON.stringify(updateProductById));
        return updateProductById;
    }

    deleteProduct(id) {
        const allProductos = JSON.parse(fs.readFileSync("products.txt", "utf-8"));
        const index = allProductos.findIndex(ele => ele.id === id);
        allProductos.splice(index, 1);
        fs.writeFileSync("products.txt", JSON.stringify(allProductos));
        return allProductos;
    }
}

const product1 = new ProductManager();

product1.addProduct("titulo1", "descripcion1", 1000, "imagen1", 10);
product1.addProduct("titulo2", "descripcion2", 2000, "imagen2", 20);
product1.addProduct("titulo3", "descripcion3", 3000, "imagen3", 30);
product1.addProduct("titulo4", "descripcion4", 4000, "imagen4", 40);
product1.addProduct("titulo5", "descripcion5", 5000, "imagen5", 50);

//Try yourself :D

//console.log(product1.getProducts());

//console.log(product1.getProductById(3));

//console.log(product1.deleteProduct(3));

// console.log(product1.updateProductById(5, "titulo10", "descripcion10", 10000, "imagen10", 100));