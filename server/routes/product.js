/**
 * Controller for all endpoints which starts with /products prefix
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
const {ensureAuthenticated} = require('../config/auth');

/**
 * Endpoint responsible for getting all products in the system.
 * GET at: /products
 * @see Product
 */
router.get('/', ensureAuthenticated, async (req, res, next) => {
    let products;
    try {
        products = await Product.find(); // get all products, there is  option "limit" after limit() ex. Product.find().limit(10)
    } catch (error) {
        products=[];
    }
    res.render('products',{products});
});
/**
 * Endpoint responsible for getting specific product by its id.
 * GET at: /products/{productsId}
 * @param productId - id of the product that should be returned.
 * @see Product
 */
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product).status(200);
    } catch (error) {
        res.json({message: error}).status(400);
    }
})
/**
 * Endpoint responsible for creating new product to the system.
 * POST at: /products
 * @see Product
 */
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
    try {
        const savedProduct = await product.save();
        res.json(savedProduct).status(201);
    } catch (error) {
        res.json({message: error}).status(400);
    }
});
/**
 * Endpoint responsible for deleting product by id.
 * DELETE at: /products/{productId}
 * @param productId - id of the product that should be deleted.
 * @see Product
 */
router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.deleteOne({_id: req.params.productId});
        res.json(removedProduct).status(202);
    } catch (error) {
        res.json({message: error}).status(400);
    }
});
/**
 * Endpoint responsible for updating product, specified by id.
 * PATCH at: /products/{productsId}
 * @param productId - id of the product that should be updated.
 * @param body - product sent in the body of http request which data will override product with productId in the system.
 * @see Product
 */
router.patch('/:productId', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id: req.params.productId},
            {
                $set:
                    {
                        name: req.body.name,
                        description: req.body.description,
                        category: req.body.category,
                        price: req.body.price,
                        data: req.body.date
                    }
            });
        res.json(updatedProduct).status(200);
    } catch (error) {
        res.json({message: error}).status(404);
    }
})
module.exports = router;