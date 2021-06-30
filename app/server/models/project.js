let mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    abstract : {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true,
        unique: true
    },
    tags: {
        type: [String]
    },
    createdBy: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    lastVisited: {
        type: String,
        default: ''
    }
}, {timestamps : true});

module.exports = mongoose.model("Project", ProjectSchema);