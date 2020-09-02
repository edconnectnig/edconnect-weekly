const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {

    }

    getFullName() {

    }
}

class Users extends DataModel {
    authenticate(email, password) {

    }

    getByEmail(email) {

    }

    getByMatricNumber(matricNumber) {

    }

    validate(obj) {

    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};