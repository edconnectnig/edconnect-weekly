const Project = require("../models/project");
const viewProject = require("./viewProject");
const helper = require("../models/mongo_helper");

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    const project = new Project({
      name,
      abstract,
      authors,
      tags,
      createdBy
    });

    const save = await project.save();
    if (save) {
      return [true, project];
    }
  }
  catch (err) {
    return [false, helper.translateError(err)];
  }
};
const saveProjectDetails = async (project_by_id, current_user) => {
  let response = await viewProject.saveViewedProject(current_user.firstname, project_by_id.name, current_user._id, project_by_id._id, new Date());
  if (response)
    return true;
  else
    return false;
}
/* Return project with specified id and saves or updates the date it was viewed*/
const getById = async (id) => {
  // populate projects with data from database.
  const project_by_id = await Project.findById(id).populate('createdBy');
  return project_by_id;
};

/* Return all projects */
const getAll = async () => {
  const all = await Project.find();
  return all;
};

/**Returns the four last projects created */
const getLastFour = async () => {
  const all = await Project.find().sort({ createdAt: -1 }).limit(4);
  return all;
};

/**Returns 8 search results of projects per page */
const getSearchProjectResults = async (value, searchBy, pageIndex, pageSize) => {
  let all = '';
  pageIndex = Number(pageIndex);
  pageSize = Number(pageSize);

  switch (searchBy) {
    case 'name':
      all = await Project.find({ "name": { "$regex": value, "$options": "$i" } }).skip((pageIndex - 1) * pageSize).limit(pageSize);
      break;

    case 'abstract':
      all = await Project.find({ "abstract": { "$regex": value, "$options": "$i" } }).skip((pageIndex - 1) * pageSize).limit(pageSize);
      break;

    case 'authors':
      all = await Project.find({ "authors": { "$regex": value, "$options": "$i" } }).skip((pageIndex - 1) * pageSize).limit(pageSize);
      break;

    case 'tags':
      all = await Project.find({ "tags": { "$regex": value, "$options": "$i" } }).skip((pageIndex - 1) * pageSize).limit(pageSize);
      break;
  }
  return all;
};

/*counts the number of projects gotten from each search*/
const countProjects = async (value, searchBy) => {
  let all = '';
  
  switch (searchBy) {
    case 'name':
      all = await Project.find({ "name": { "$regex": value, "$options": "$i" } }).count();
      break;

    case 'abstract':
      all = await Project.find({ "abstract": { "$regex": value, "$options": "$i" } }).count();
      break;

    case 'authors':
      all = await Project.find({ "authors": { "$regex": value, "$options": "$i" } }).count();
      break;

    case 'tags':
      all = await Project.find({ "tags": { "$regex": value, "$options": "$i" } }).count();
      break;
  }
  return all;
}
module.exports = {
  getAll,
  create,
  getById,
  countProjects,
  getLastFour,
  saveProjectDetails,
  getSearchProjectResults
};