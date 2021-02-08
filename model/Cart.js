module.exports = function Cart(previousCart){
    this.products = previousCart.products || [];
    this.totalPrice = previousCart.totalPrice || 0;
    this.addProduct = function (product){
        this.products.push(product);
        this.totalPrice+=product.price;
    }
}
