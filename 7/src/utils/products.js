const { faker } = require("@faker-js/faker");

const createProducts = () => {
    const id = faker.commerce.isbn();
    const randomName = faker.commerce.productName();
    const randomDepartament = faker.commerce.department();
    const randomPrice = faker.commerce.price({ symbol: '$' });

    const randomObject = {
        id: id,
        name: randomName,
        department: randomDepartament,
        price: randomPrice
    };

    return randomObject
};

module.exports = createProducts;