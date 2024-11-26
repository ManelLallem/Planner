const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannercontroller');

//route for adding new tasks 
router.post('/addTask', plannerController.addTask);
router.get('/getTasks', plannerController.getTasks);
router.put('/updateTasks', plannerController.updateTask)
router.delete('/deleteTask', plannerController.deleteTask)


module.exports = router;