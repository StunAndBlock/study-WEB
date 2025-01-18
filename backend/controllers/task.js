const db = require('../models');

exports.getTasksForMechanic = async (req, res) => {
  try {
    const mechanic = await db.Mechanic.findByPk(req.params.id, { include: db.Task });
    if (mechanic) {
      res.json(mechanic.Tasks);
    } else {
      res.status(404).send('Mechanic not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addTaskToMechanic = async (req, res) => {
  try {
    const mechanic = await db.Mechanic.findByPk(req.params.id);
    if (mechanic) {
      const { carBrand, operationName, difficulty } = req.body;
      const task = await db.Task.create({ carBrand, operationName, difficulty, mechanicId: mechanic.id });
      res.status(201).json(task);
    } else {
      res.status(404).send('Mechanic not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.taskId);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.reassignTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.taskId);
    const newMechanic = await db.Mechanic.findByPk(req.params.id);
    if (task && newMechanic) {
      task.mechanicId = newMechanic.id;
      await task.save();
      res.json(task);
    } else {
      res.status(404).send('Task or mechanic not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};