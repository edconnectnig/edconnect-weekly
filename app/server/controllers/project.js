const express = require("express");
const router = express.Router();

router.get("/projects/submit", (req, res) => {
  const user = req.session.user;
  const errorJson = req.flash("projectError");

  let error;
  if (errorJson.length > 0) {
    error = JSON.parse(errorJson[0]);
  }

  if (!user) {
    res.redirect("/login");
  } else {
    res.render("CreateProject", { error, user });
  }
});

router.post("/projects/submit", (req, res) => {
  const response = require("../services/project");
  const { tags, authors, id, ...others } = req.body;
  const tagsArr = tags.split(", ");
  const authorsArr = authors.split(", ");

  const project = response.create({
    tags: tagsArr,
    authors: authorsArr,
    createdBy: req.session.user.id,
    ...others,
  });

  if (project[0] === true) {
    res.redirect("/");
  } else {
    req.flash("projectError", JSON.stringify(project[1]));
    res.redirect(303, "/projects/submit");
  }
});

router.get("/project/:id", (req, res) => {
  const projectRes = require("../services/project");
  const projectId = req.params.id;
  const project = projectRes.getById(projectId);
  const userId = project.createdBy;
  const userRes = require("../services/user");
  const creator = userRes.getById(userId);
  const user = req.session.user;

  if (!project) {
    res.redirect("/");
  }
  if (user) {
    res.render("Project", { project, user, creator });
  } else {
    res.render("Project", { project, creator });
  }
});

module.exports = router;
