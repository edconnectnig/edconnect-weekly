const mongoose = require('../db');
const Schema = mongoose.Schema; 

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attachment' }],
    tags: { type: [String] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true }) 

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;