const express = require("express");
const router = express.Router();
const project = require("../services/project");

router.get("/", async (req, res) => {
  const data = await project.getAll();
  const user = req.session.user;

  if (user) {
    res.render("Home", { data, user });
  } else {
    res.render("Home", { data });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/");
});

module.exports = router;
