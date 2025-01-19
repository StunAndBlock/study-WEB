// routes/carBrands.js
const express = require('express');
const router = express.Router();
const carBrandsController = require('../controllers/carBrands');

router.get('/brands', carBrandsController.getCarBrands);
router.post('/brands', carBrandsController.addCarBrand);

module.exports = router;