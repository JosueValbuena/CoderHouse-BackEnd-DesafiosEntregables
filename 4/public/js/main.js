const socket = io();

const listRender = document.querySelector('#list__render');

let products = [];

document.querySelector("#form__add").addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const price = document.querySelector('#price');
    const stock = document.querySelector('#stock');
    const category = document.querySelector('#category');

    const newObj = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        code: title.value + Date.now(),
        price: Number(price.value),
        stock: Number(stock.value),
        category: category.value
    };

    title.value = '';
    description.value = '';
    price.value = '';
    stock.value = '';
    category.value = '';

    products.push(newObj);
    console.log(products);

    socket.emit('productAdded', { message: 'Producto agregado a la lista', products: products })
})

document.querySelector('#form__delete').addEventListener('submit', (e) => {
    e.preventDefault();

    const deleteInput = document.querySelector('#delete');
    const index = products.findIndex(ele => ele.id === Number(deleteInput.value));
    products.splice(index, 1);
    renderProducts(products);

    socket.emit('productDeleted', {message: 'Producto eliminado', products: products});
})

function renderProducts(products) {
    let htmlRender = '';
    products.forEach(ele =>
        htmlRender += `
        <tr>
            <td>${ele.id}</td>
            <td>${ele.title}</td>
            <td>${ele.description}</td>
            <td>${ele.code}</td>
            <td>${ele.price}</td>
            <td>${ele.stock}</td>
            <td>${ele.category}</td>
        </tr>
        `
    )
    listRender.innerHTML = htmlRender;
}

socket.on('addProduct', (data) => {
    console.log(data.message)
    renderProducts(data.products);
})

socket.on('deleteProduct', (data) => {
    console.log(data.message)
    renderProducts(data.products);
})

socket.on('userConnected', (message) => {
    console.log(message);
})

socket.on('ProductsDB', (data) => {
    products = data;
})