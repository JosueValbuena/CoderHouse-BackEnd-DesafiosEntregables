class ProductManager {
    constructor() {
        this.products = []
    }

    addProducts(title, description, price, thumbnail, stock) {
        if(!title || !description || !price || !thumbnail || !stock){
            console.log("Todos los campos son obligatorios")
            return
        }

        const code = this.products.length + 1;

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product);
    }
    getProducts() {
        return this.products
    }
    getProductsById(product_id) {
        const product = this.products.find(ele => ele.code === Number(product_id))
        if(!product){
            console.log("Producto no encontrado");
            return
        }
        return product
    }
}

const product1 = new ProductManager();

product1.addProducts("Orange", "fruits", "1000", "https://cdn.pixabay.com/photo/2023/08/16/10/09/oranges-8193789_1280.jpg", 10);
product1.addProducts("Banana", "fruits", "2000", "https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_1280.jpg", 6);
product1.addProducts("Apple", "fruits", "3000", "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg", 5);
console.log(product1.getProducts());
console.log(product1.getProductsById(2));

const product2 = new ProductManager();

product1.addProducts("Watermelon", "fruits", "1000", 10);

