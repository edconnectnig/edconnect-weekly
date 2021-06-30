const Project = require("../models/project");
const helper = require("../models/mongo_helper");
/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  // populate projects with data from file.
  try {
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
  catch (err) {
    return [false, helper.translateError(err)];
  }
};

/* Return project with specified id */
const getById = async (id) => {
  //an array that stores the month names
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  // populate projects with data from file.
  const project_by_id = await Project.findById(id).populate('createdBy');
  //console.log(project_by_id, "Project by id");
  var date = new Date();
  var date_format = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  console.log(date_format, 'My date formate')
  project_by_id.lastVisited = date_format;
  project_by_id.save();
  //console.log(project_by_id, "Project by id");
  return project_by_id;
};
/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  const all = await Project.find();
  //console.log(all, "All projects");
  return all;
};

const getProjectsByName = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "name": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

const getProjectsByAbstract = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "abstract": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

const getProjectsByAuthors = async (value) => {
  const all = await Project.aggregate([{
    $match: {
      "authors": { "$regex": value, "$options": "$i" }
    }
  }
  ])

  return all;
}

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