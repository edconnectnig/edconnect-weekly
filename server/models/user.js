let mongoose = require('mongoose');
let crypto = require('crypto');

let UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    matricNumber: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    graduationYear: {
        type: String,
        required: true
    },
}, {timestamps : true});

const hash = (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    if(password.length < 7){
        throw new Error("Password should have at least 7 characters");
    }
    this.password = hash(password, this.salt);
}

UserSchema.methods.validPassword = function(password){
    return this.password === hash(password, this.salt);
}

module.exports = mongoose.model("User", UserSchema);