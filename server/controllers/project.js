const express = require("express");
const router = express.Router();
const projectRes = require("../services/project");
const userRes = require("../services/user");

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

router.post("/projects/submit", async (req, res) => {
  try {
    const { body } = req;
    const { name, abstract } = body;
    const tags = body.tags.split(", ");
    const authors = body.authors.split(", ");

    const newProject = await projectRes.create({
      name,
      abstract,
      authors,
      tags,
      createdBy: req.session.user._id,
    });

    if (!newProject[0]) {
      throw "ProjectCreateError";
    }

    res.redirect("/");
  } catch (e) {
    if (e === "ProjectCreateError") {
      req.flash("projectError", JSON.stringify(newProject[1]));
      res.redirect(303, "/projects/submit");
    }
  }
});

router.get("/project/:id", async (req, res) => {
  const projectId = req.params.id;
  const project = await projectRes.getById(projectId);
  const userId = project.createdBy;
  const creator = await userRes.getById(userId);
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
