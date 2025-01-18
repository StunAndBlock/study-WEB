const db = require('../models');

exports.getAllMechanics = async (req, res) => {
  try {
    const mechanics = await db.Mechanic.findAll();
    res.json(mechanics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createMechanic = async (req, res) => {
  try {
    const { id, name, carBrands } = req.body;
    const mechanic = await db.Mechanic.create({ id, name, carBrands });
    res.status(201).json(mechanic);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, carBrands } = req.body;
    const mechanic = await db.Mechanic.findByPk(id);
    if (mechanic) {
      mechanic.name = name;
      mechanic.carBrands = carBrands;
      await mechanic.save();
      res.json(mechanic);
    } else {
      res.status(404).send('Mechanic not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const mechanic = await db.Mechanic.findByPk(id);
    if (mechanic) {
      await mechanic.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Mechanic not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};