const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 7, required: true },
    salt: { type: String, required: true },
    matricNumber: { type: String, required: true },
    program: { type: String },
    graduationYear: { type: String },
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

UserSchema.methods.validPassword = function (result, password) {
  return (
    result.password ===
    crypto.pbkdf2Sync(password, result.salt, 1000, 64, "sha512").toString("hex")
  );
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
