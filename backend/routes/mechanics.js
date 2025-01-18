const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanic');

router.get('/mechanics', mechanicController.getAllMechanics);
router.post('/mechanics', mechanicController.createMechanic);
router.put('/mechanics/:id', mechanicController.updateMechanic);
router.delete('/mechanics/:id', mechanicController.deleteMechanic);

module.exports = router;