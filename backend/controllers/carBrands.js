const { CarBrand } = require('../models');

exports.getCarBrands = async (req, res) => {
  try {
    const carBrands = await CarBrand.findAll();
    res.status(200).json(carBrands);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.addCarBrand = async (req, res) => {
    try {
      const { name } = req.body;
  
      const existingBrand = await CarBrand.findOne({ where: { name } });
      if (existingBrand) {
        return res.status(400).json({ message: 'Brand already exists' });
      }
  
      const carBrand = await CarBrand.create({ name });
      res.status(201).json(carBrand);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };