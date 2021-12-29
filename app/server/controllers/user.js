const express = require("express");
const router = express.Router();
const school = require("../services/school");
const user = require("../services/user");

router.get("/signup", (req, res) => {
  // add code to render the Signup Component, and pass in the programs and gradyears as props
  const error = req.flash("error");
  res.render("Signup", {
    props1: school.getPrograms(),
    props2: school.getGradYears(),
    props3: error,
    user: req.session.user,
  });
});

router.post("/signup", async (req, res) => {
  let regInfo = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    matricNumber: req.body.matricNumber,
    program: req.body.program,
    graduationYear: req.body.graduationYear,
  };
  const results = await user.create(regInfo);
  if (results[0] === true) {
    req.session.user = results[1];
    res.redirect("/");
  } else {
    const error = results[1];
    req.flash("error", error);
    res.redirect(303, "/signup");
  }
});

router.get("/login", (req, res) => {
  // add code to render the Login Component
  const error = req.flash("error");
  res.render("Login", { props: error, user: req.session.user });
});

router.post("/login", async (req, res) => {
  const results = await user.authenticate(req.body.email, req.body.password);
  if (results[0] === true) {
    req.session.user = results[1];
    //console.log(req.session.user)
    res.redirect("/");
  } else {
    const error = results[1];
    req.flash("error", error);
    res.redirect(303, "/login");
  }
});

module.exports = router;
