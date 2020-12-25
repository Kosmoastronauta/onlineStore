const express = require('express')
const router = express.Router();

router.get('/getAll', (request, response) => {
    response.json({success: true});
})

module.exports = router;