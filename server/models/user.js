const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "please enter your first name"],
      lowercase: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: [true, "please enter your last name"],
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: [true, "please enter a password"] },

    salt: { type: String, required: [true, "salt is required"] },

    matricNumber: {
      type: String,
      required: [true, "please enter your matric number"],
      lowercase: true,
      trim: true,
    },

    program: String,

    graduationYear: String,
  },

  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  if (password.length >= 7) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
  } else {
    throw new Error("Password should have at least 7 characters");
  }
};

UserSchema.statics.validPassword = function (user, password) {
  const salt = user.salt;
  const hashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashed;
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
