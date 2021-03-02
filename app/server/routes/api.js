const express = require("express");
const api = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/users").User;
const Users = require("../models/users").Users;
const Project = require("../models/projects").Project;
const Projects = require("../models/projects").Projects;

const usersFile = path.join(__dirname, "../users.json");
const projectsFile = path.join(__dirname, "../projects.json");

const getFileAsJson = (file) => {
  return JSON.parse(fs.readFileSync(file));
};

const saveJsonFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify({ data }));
};

const saveUsersDb = (data) => saveJsonFile(usersFile, data);
const saveProjectsDb = (data) => saveJsonFile(projectsFile, data);

const id = () => Math.random().toString(36).substring(2);

const getCookie = (req, name) => {
  const cookie = req.headers["cookie"] || "";
  for (const ck of cookie.split(";")) {
    const vals = ck.split("=");
    if (vals[0].trim() === name) {
      return vals[1];
    }
  }
};
const handlePost = (success, data, errors, res) => {
  if (success) {
    res.status(200).json({ status: "ok", data });
  } else {
    res.status(400).json({ status: "error", errors });
  }
};

const requireLogin = (req, res, next) => {
  const uid = getCookie(req, "uid");
  if (uid) {
    req.session.uid = uid;
    next();
  } else {
    res.status(401).json({ status: "error", errors: "Unauthorized Access" });
  }
};

api.post("/register", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear,
  } = req.body;
  const users = new Users();
  users.data = getFileAsJson(usersFile).data;

  const user = new User(
    id(),
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  );
  const success = users.save(user);
  if (success) {
    saveUsersDb(users.data);
  }
  handlePost(success, { id: user.id }, users.errors, res);
});

api.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = new Users();
  users.data = getFileAsJson(usersFile).data;

  const success = users.authenticate(email, password);
  if (success) {
    req.session.user = users.getByEmail(email);
  }
  handlePost(success, req.session.user, users.errors, res);
});

api.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ status: "ok" });
});

api.get("/users", (req, res) => {
  const users = new Users();
  users.data = getFileAsJson(usersFile).data;
  res.json(users.getAll());
});

api.get("/users/:id", (req, res) => {
  const users = new Users();
  users.data = getFileAsJson(usersFile).data;
  res.json(users.getById(req.params.id));
});

api.get("/projects", (req, res) => {
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;
  res.json(projects.getAll().reverse());
});

api.get("/projects/:id", (req, res) => {
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;
  res.json(projects.getById(req.params.id));
});

api.post("/projects", requireLogin, (req, res) => {
  const { name, abstract, authors, tags } = req.body;
  const projects = new Projects();
  projects.data = getFileAsJson(projectsFile).data;

  const project = new Project(
    id(),
    name,
    abstract,
    authors,
    tags,
    req.session.uid
  );
  const success = projects.save(project);
  if (success) {
    saveProjectsDb(projects.data);
  }
  handlePost(success, {}, projects.errors, res);
});

api.get("/programs", (req, res) => {
  res.json([
    "Computer Science",
    "Computer Information Systems",
    "Computer technology",
  ]);
});

api.get("/graduationYears", (req, res) => {
  res.json(["2015", "2016", "2017", "2018", "2019", "2020"]);
});

module.exports = api;