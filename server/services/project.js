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

/* Return project with specified id and saves or updates the date it was viewed*/
const getById = async (id, current_user) => {
  // populate projects with data from database.
  const project_by_id = await Project.findById(id).populate('createdBy');
  const saveViewedUser = await viewProject.saveViewedProject(current_user.firstname, project_by_id.name, current_user._id, project_by_id._id, new Date());
  project_by_id.lastVisited = saveViewedUser.date;
  await project_by_id.save();
  return project_by_id;
};

/* Return all projects */
const getAll = async () => {
  const all = await Project.find();
  return all;
};

/**Return all projects with names corresponding with the name value passed in as a parameter */
const getProjectsByName = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "name": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

/**Return all projects with abstracts corresponding with the abstract value passed in as a parameter */
const getProjectsByAbstract = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "abstract": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

/**Return all projects with authors corresponding with the author value passed in as a parameter */
const getProjectsByAuthors = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "authors": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

/**Return all projects with tags corresponding with the tag value passed in as a parameter */
const getProjectsByTags = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "tags": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

module.exports = {
  getAll,
  create,
  getById,
  getProjectsByName,
  getProjectsByAbstract,
  getProjectsByAuthors,
  getProjectsByTags
};