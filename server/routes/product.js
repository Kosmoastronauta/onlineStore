const express = require('express')
const router = express.Router();
const Post = require('../model/Product');

router.get('/getAll', (req, res) => {
    res.json({success: true});
});

router.post('/newProduct', ((req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).json({message: error});
        })
}));
module.exports = router;