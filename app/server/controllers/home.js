const express = require("express");
const router = express.Router();
const projects = require("../services/project");

router.get("/", async (req, res) => {
  // add code to render the Home Component, and pass in the projects as a props
  const project = await projects.getAll();
  const user = req.session.user;
  res.render("Home", { project, user });
});

router.get("/logout", (req, res) => {
  // add code to destroy the session/cookie
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
