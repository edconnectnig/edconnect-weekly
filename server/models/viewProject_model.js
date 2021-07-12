let mongoose = require('mongoose');

let viewProjectSchema = new mongoose.Schema({
	userName: {
		type: String
	},
	projectName: {
		type: String
	},
	userId : {
		type: mongoose.ObjectId,
		ref: 'User'
	},
	projectId: {
		type: mongoose.ObjectId,
		ref: 'Project'
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {timestamps: true});

module.exports = mongoose.model('viewProject', viewProjectSchema)