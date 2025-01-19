const db = require('../models');

exports.getTasksForMechanic = async (req, res) => {
  try {
    const mechanic = await db.Mechanic.findByPk(req.params.id);

    if (!mechanic) {
      return res.status(404).send('Mechanic not found');
    }

    // Загружаем задачи для механика вручную, чтобы проверить
    const tasks = await db.Task.findAll({
      where: { mechanicId: mechanic.id }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.addTaskToMechanic = async (req, res) => {
  try {
    const mechanic = await db.Mechanic.findByPk(req.params.id);
    console.log("Request body:", req.body);
    if (mechanic) {
      console.log("here");
      const { carBrand, operation, complexity } = req.body;
      console.log("Parsed data:", { carBrand, operation, complexity }); // Логируем данные после извлечения
      const task = await db.Task.create({ carBrand, operation, complexity, mechanicId: mechanic.id });
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
    const mechanicId = req.params.id; // ID механика из параметров запроса
    const taskId = req.params.taskId; // ID задачи из параметров запроса

    console.log(mechanicId)
    console.log(taskId)
    const task = await db.Task.findOne({ where: { id: taskId, mechanicId } });

    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Task not found or does not belong to this mechanic');
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
