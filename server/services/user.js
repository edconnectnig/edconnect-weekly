const User = require("../models/user");
const helper = require("../models/mongo_helper");

/* Creates new user */
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
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

  
  user.setPassword(password);
  const save = await user.save();
  
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
  const users = await User.findById(id);
  return users;
};

/* Return all users */
const getAll = async () => {
  const all = await User.find();
  return all;
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};