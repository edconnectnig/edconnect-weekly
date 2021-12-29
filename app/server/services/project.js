const Project = require("../models/project");
const helper = require("../models/mongo_helper");

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    // Create user and add to database.
    const project = new Project();
    project.name = name;
    project.abstract = abstract;
    project.authors = authors;
    project.tags = tags;
    project.createdBy = createdBy;

    if (await project.save()) {
      return [true, project];
    }
  } catch (error) {
    /* Incase of error, catch, do ya thing! */
    return [false, helper.translateError(error)];
  }
};

/* Return project with specified id */
const getById = async (id) => {
  // populate projects with data from file.
  return await Project.findOne({ _id: id });
};

/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  return await Project.find();
};

module.exports = {
  getAll,
  create,
  getById,
};
