const express = require("express");
const router = express.Router();
//const User = require("../models/user");
//const Project = require("../models/project");
const project = require("../services/project");
const user = require("../services/user");

router.get("/projects/submit", (req, res) => {
  // add code to render the CreateProject Component
  const error = req.flash("error");
  res.render("CreateProject", { props: error, user: req.session.user });
  !req.session.user && res.redirect("/login");
});

router.post("/projects/submit", async (req, res) => {
  let projectInfo = {
    name: req.body.name,
    abstract: req.body.abstract,
    tags: req.body.tags.split(","),
    authors: req.body.authors.split(","),
    createdBy: req.session.user._id,
  };

  const results = await project.create(projectInfo);
  if (results[0] === true) {
    res.redirect("/");
  } else {
    const error = results[1];
    req.flash("error", error);
    res.redirect(303, "/projects/submit");
  }
});

router.get("/project/:id", async (req, res) => {
  // add code to render the CreateProject Component
  const params = req.params.id;
  const userParams = await project.getById(params);
  res.render("Project", {
    props1: userParams,
    props2: await user.getById(userParams.createdBy),
    user: req.session.user,
  });
});

module.exports = router;
