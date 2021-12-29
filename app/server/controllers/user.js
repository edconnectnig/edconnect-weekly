const express = require("express");
const router = express.Router();
const User = require("../services/user");

router.get("/signup", (req, res) => {
  const user = req.session.user;
  const response = require("../services/school");
  const programs = response.getPrograms();
  const graduationYears = response.getGradYears();
  const errorJson = req.flash("signupError")[0];
  const inputJson = req.flash("signupInput")[0];

  let error;
  let input;
  if (errorJson && inputJson) {
    error = JSON.parse(errorJson);
    input = JSON.parse(inputJson);
  }

  if (user) {
    res.render("Signup", { programs, graduationYears, error, input, user });
  } else {
    res.render("Signup", { programs, graduationYears, error, input });
  }
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, ...others } = req.body;
  const body = { firstname: firstName, lastname: lastName, ...others };
  const user = await User.create(body);
  if (user[0]) {
    req.session.user = user[1];
    res.redirect("/");
  } else {
    req.flash("signupInput", JSON.stringify(req.body));
    req.flash("signupError", JSON.stringify(user[1]));
    res.redirect(303, "/signup");
  }
});

router.get("/login", (req, res) => {
  const user = req.session.user;
  const error = req.flash("loginError")[0];
  if (user) {
    res.render("Login", { error, user });
  } else {
    res.render("Login", { error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isValid = await User.authenticate(email, password);

  if (isValid[0]) {
    req.session.user = isValid[1];
    res.redirect("/");
  } else {
    req.flash("loginError", "true");
    res.redirect(303, "/login");
  }
});
module.exports = router;
