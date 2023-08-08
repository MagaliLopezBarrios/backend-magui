const fs = require ('fs');


class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        
        if (this.products.some((product) => product.code === code)) {
            console.log("El codigo ya esta en uso");
            return;
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
    };

    getProducts = () => {
        return this.products;
    };

    getProductById = (id) => {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.log("No encontrado");
        }
        return product;
    };

    deleteProduct (id) {
        this.products = this.getProducts();
        const product = this.getProductById(id);
        if (!product) {
            console.error ('El producto ${id} no existe');

        } else {
            this.products = this.products.filter ((prod) => prod.id !== product.id);
            this.saveProductsInJSON();
            console.log('Product id: ${product.id} ha sido eliminado');
        }
    };

    updateProduct (id, product){
        this.products = this.getProducts();
        let position = this.products.findIndex((prod) => prod.id === id);

        if (position === -1){
            console.error('El producto ${is} no existe');
        } else {
            this.products [position].title = product.title;
            this.products [position].description = product.description;
            this.products [position].price = product.price;
            this.products [position].thumbnail = product.thumbnail;
            this.products [position].code = product.code;
            this.products [position].stock = product.stock;
            this.saveProductsInJSON();
            console.log('Producto actualizado');

        }
    }

    saveProductsInJSON() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

const productManager = new ProductManager(); // se crea instancia
console.log(productManager.getProducts()); // se verifica que recien creada devuelva un array vacio
// se agrega un producto
productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
console.log(productManager.getProducts()); // se muestra el producto agregado
// se agrega el mismo producto arrojando un error por estar repetido el code
productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc124",
    25
);
console.log(productManager.getProducts());

productManager.getProductById(1); // 
productManager.getProductById(5); // se verifica al buscar por un id inexistente que arroje error
// console.log(productManager.getProductById(1)); // se muestra un producto existente encontrado por el id
