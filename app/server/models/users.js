const mongoose = require('../db');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    matricNumber: { type: String, required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'program', required: true },
    graduationYear: { type: String, required: true }
}, { timestamps: true });

const hash = (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = hash(password, this.salt);
};

UserSchema.methods.validPassword = function (password) {
    return this.password === hash(password, this.salt);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;