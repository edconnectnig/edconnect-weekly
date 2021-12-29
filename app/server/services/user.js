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
  try {
    // Create user and add to database.
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.matricNumber = matricNumber;
    user.program = program;
    user.graduationYear = graduationYear;
    user.setPassword(password);

    if (await user.save()) {
      return [true, user];
    }
  } catch (error) {
    /* Incase of error, catch, do ya thing! */
    return [false, helper.translateError(error)];
  }
};

/* Authenticate a user */
const authenticate = async (email, password) => {
  const user = new User();
  user.email = email;
  user.password = password;
  const result = await User.findOne({ email });
  // Get user data if email and password match
  if (result && user.validPassword(result, user.password)) {
    return [true, result];
  } else {
    /* Incase of an error, catch, do ya thing! */
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = async (id) => {
  // populate users with data from file.
  return await User.findOne({ _id: id });
};

/* Return all users */
const getAll = async () => {
  // populate users with data from file.
  return await User.find();
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};
