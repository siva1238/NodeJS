const express = require('express');

const prodContrl = require('../controllers/products')

const router = express.Router();

router.get('/', prodContrl.getProducts);

module.exports = router;
