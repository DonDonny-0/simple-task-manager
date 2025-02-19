const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "maximum characters reached (20)"]
    },
    completed: {
        type: Boolean,
        // default: false
    }
})

module.exports = mongoose.model('Task', taskSchema)