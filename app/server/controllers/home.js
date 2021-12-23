const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const response = require("../services/project");
  const data = response.getAll();
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
