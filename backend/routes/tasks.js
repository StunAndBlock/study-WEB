const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router.get('/:mechanicId', taskController.getTasksForMechanic);
router.post('/:mechanicId', taskController.addTaskToMechanic);
router.delete('/:mechanicId/:taskId', taskController.deleteTask);
router.put('/:mechanicId/:taskId', taskController.reassignTask);

module.exports = router;