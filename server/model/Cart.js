let cart = null;
module.exports = class Cart {

    static save(product) {
        if (cart) {

            cart.products.push(product);
            cart.totalPrice+=product.price;
        }else {
            cart={products: [], totalPrice: 0};
            cart.products.push(product);
            cart.totalPrice=product.price;
        }
    }

    static getCart(){
        return cart;
    }
}
