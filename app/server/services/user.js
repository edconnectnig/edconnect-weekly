const User = require("../models/user");
const helper = require("../models/mongo_helper");
/* Creates new user */
console.log("Before creating user");
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  console.log("Hello");
  console.log(firstname + lastname);
  try{
  const user = new User({
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  });
  console.log(user);
  
  user.setPassword(password);
  const save = await user.save();
  console.log("User saved");
  if (save) {
    return [true, user];
  }}
  catch (err){
    return[false, helper.translateError(err)];
  }
};

/* Authenticate a user */
const authenticate = async (em, password) => {
  const email1 = await User.findOne({email: em});
  const valid = await email1.validPassword(password);

  if (email1 != null && valid == true) {
    return [true, email1];
  }
  else{
    return [false, "Invalid email/password" ];
  }
};

/* Return user with specified id */
const getById = async (id) => {
  // populate users with data from file.
  const users = await User.findById(id);
  console.log(users);

  return users;
};

/* Return all users */
const getAll = async () => {
  const all = await User.find();
  console.log(all, "All projects");

  return all;
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};