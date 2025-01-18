const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

router.get('/mechanics/:id/tasks', taskController.getTasksForMechanic);
router.post('/mechanics/:id/tasks', taskController.addTaskToMechanic);
router.delete('/mechanics/:id/tasks/:taskId', taskController.deleteTask);
router.put('/mechanics/:id/tasks/:taskId', taskController.reassignTask);

module.exports = router;