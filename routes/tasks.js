const express = require('express')
const router = express.Router()

// initialise functions from controller (in order of export)
const {getAllTasks, createTask, getTask, updateTask, deleteTask, editTask} = require('../controllers/tasks')

// following functions routed to '/' since they don't work with a particular task
router.route('/').get(getAllTasks).post(createTask);

// following function routed to '/' since they work with only 1 task
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(editTask)

// router can be used by other files
module.exports = router;