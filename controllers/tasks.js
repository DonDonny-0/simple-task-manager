const Task = require('../models/Task')

// REST API (CRUD)
// -- Create
// -- Read
// -- Update
// -- Delete


// function to find all tasks in database
const getAllTasks = async (req, res) => {
    try {
        // promise which finds all tasks in db
        const tasks = await Task.find({})

        // success state, displays tasks, and number of tasks found
        res.status(200).json({ tasks, amount: tasks.length })
    } 
    catch (error) {

        // fail state, something went wrong
        res.status(500).json({ msg: error })
    }
}


const createTask = async (req,res) => {
    try {
        // promise which creates a new task
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } 
    catch (error) {
        res.status(500).json({ msg: error })
    }
}      


const getTask = async (req,res) => {
    try {
        // get the id of specified task
        const {id: taskID} = req.params

        // find the task with the same id
        const task = await Task.findOne({ _id: taskID })
    if (!task) {

        // fail if task cannot be found
        return res.status(404).json({ msg: `no task with id : ${taskID}` })
    }

    res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


const updateTask = async (req,res) => {
    try {
        const {id:taskID} = req.params;

        // find task and update with new details (req.body)
        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
            new: true,
            runValidators: true
        })
        
        if (!task) {
            return res.status(404).json({ msg: `no task with id : ${taskID}` })
        }
        
        res.status(200).json({ id: taskID, data: req.body })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const editTask = async (req,res) => {
    try {
        const {id:taskID} = req.params;


        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        })
        
        if (!task) {
            return res.status(404).json({ msg: `no task with id : ${taskID}` })
        }
        
        res.status(200).json({ id: taskID, data: req.body })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


const deleteTask = async (req,res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `no task with id : ${taskID}`})
        }
        return res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// allows functions below to be used in other files
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask
}