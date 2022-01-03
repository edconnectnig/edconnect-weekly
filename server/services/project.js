// imports
const Project = require("../models/project");
const helper = require("../models/mongo_helper");

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    const project = new Project({ name, abstract, authors, tags, createdBy });

    const newProject = await project.save();

    if (!newProject) {
      throw "ProjectCreateError";
    }

    return [true, project];
  } catch (e) {
    if (e === "ProjectCreateError") {
      return [false, helper.translateError(e)];
    }
  }
};

/* Return project with specified id */
const getById = async (id) => {
  return await Project.findById(id);
};

/* Return all projects */
const getAll = async () => {
  return await Project.find();
};

module.exports = {
  getAll,
  create,
  getById,
};
