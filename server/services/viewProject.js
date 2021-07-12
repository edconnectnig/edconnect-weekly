const ViewProject = require("../models/viewProject_model");
const helper = require("../models/mongo_helper");

/**Saves projects that have been viewed */
const saveViewedProject = async (userName, projectName, userId, projectId, date) => {
	const projectViewedDetails = await ViewProject.find({userId: userId, projectId: projectId});
	
	if(projectViewedDetails.length > 0) {
		const update = await updateViewedProject(projectViewedDetails);
		return update;
	}
	else{
		try {
			const project = new ViewProject({
			userName,
			projectName,
			projectId,
			userId,
			date
		});
		const save = await project.save();
		if (save) {
			return project;
		}
		}
		catch (err) {
			return helper.translateError(err);
		}
	}
}

/**Updates the date viewed projects */
const updateViewedProject = async (projectViewedDetails) => {
	let update = await ViewProject.findOneAndUpdate({userId: projectViewedDetails[0].userId, projectId: projectViewedDetails[0].projectId}, { $set : {date: new Date()}}, {new: true, useFindAndModify: false}, (err, doc) => {
    if (err) {
	console.log("Something wrong when updating data!");}
});
	const save = await update.save();
	if(save){
		return update;
	}
}
/**Finds all projects that a user has viewed */
const findAllViewedProjectsOfCurrentUser = async (id) => {
	const viewedProjects = await ViewProject.find({userId: id});
	return viewedProjects;
}
module.exports = {
  saveViewedProject,
  updateViewedProject,
  findAllViewedProjectsOfCurrentUser
};