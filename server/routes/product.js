const express = require('express')
const router = express.Router();
const Product = require('../model/Product');

/**
 * Endpoint for getting all products in system.
 * @see Product
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // get all products, there is  option "limit" after limit() ex. Product.find().limit(10)
        if (products == null)
            res.json().status(204);
        else
            res.json(products).status(200);
    } catch (error) {
        res.json({message: error}).status(400);
    }
});
/**
 * Endpoint for getting specific product by its id.
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
 * Endpoint for creating new product to the system.
 * @see Product
 */
router.post('/', async (req, res) => {
    const product = new Product({
        title: req.body.title,
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
 * Endpoint for deleting product by id
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

router.patch(':/productId', async (req, res) => {
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