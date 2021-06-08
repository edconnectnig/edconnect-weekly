const Project = require("../models/project");
const helper = require("../models/mongo_helper");
/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  // populate projects with data from file.
  try{
  const project = new Project({
    name,
    abstract,
    authors,
    tags,
    createdBy
  });
  console.log(project, "Yeasssss");
  const save = await project.save();
  if (save) {
    return [true, project];
  } 
}
  catch(err) {
    return [false, helper.translateError(err)];
  }
};

/* Return project with specified id */
const getById = async (id) => {
  // populate projects with data from file.
    const find_by_id = await Project.findById(id).populate('createdBy');
    return find_by_id;
};
/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  const all = await Project.find();
  console.log(all, "All projects");
  return all;
};

module.exports = {
  getAll,
  create,
  getById
};