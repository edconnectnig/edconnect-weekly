// imports
const fs = require("fs");
const path = require("path");
const Projects = require("../models/projects").Projects;
const Project = require("../models/projects").Project;

// load data file
const projectsFile = path.join(__dirname, "../projects.json");

// helper functions
const saveJsonFile = (file, data) => fs.writeFileSync(file, JSON.stringify({ data }));
const getFileAsJson = (file) => JSON.parse(fs.readFileSync(file));
const saveProjectsToFile = (data) => saveJsonFile(projectsFile, data);
const id = () => Math.random().toString(36).substring(2);

/* Create new project */
const create = ({ name, abstract, authors, tags, createdBy }) => {
  // populate projects with data from file.
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;

  const project = new Project(
    id(),
    name,
    abstract,
    authors,
    tags,
    createdBy
  );
  if (projects.save(project)) {
    saveProjectsToFile(projects.data);
    return [true, project];
  } else {
    return [false, projects.errors];
  }
};

/* Return project with specified id */
const getById = (id) => {
  // populate projects with data from file.
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;

  return projects.getById(id);
};
/* Return all projects */
const getAll = () => {
  // populate projects with data from file.
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;

  return projects.getAll();
};

module.exports = {
  getAll,
  create,
  getById
};