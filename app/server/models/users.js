const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.matricNumber = matricNumber
        this.program = program
        this.graduationYear = graduationYear
    }

    getFullName() {
            return this.firstname + ' ' + this.lastname;

    }
}

class Users extends DataModel {
 authenticate(email, password) {
        if (this.data.some(user => user.email === email && user.password === password)) {
            return true;
        } else {
            return false;
        }
    }

    getByEmail(email) {
        var result = this.data.find(obj => {
            return obj.email === email
          }) || null
        return result;
    }

    getByMatricNumber(matricNumber) {
        var result = this.data.find(obj => {
            return obj.matricNumber === matricNumber
          }) || null
        return result; 
    }

    validate(obj) {
        this.errors = [];
        for (let prop in obj) {
 if (obj[prop].length == 0) {
                this.errors.push(`${prop} should not be empty`)
            } else if (this.data.some(user => user.email === obj[prop])) {
                this.errors.push("A user with the specified email address already exists");
            } else if (this.data.some(user => user.matricNumber === obj[prop])) {
                this.errors.push("A user with specified matric number already exists")
            } else if (obj.password.length < 7) {
                this.errors.push("Password should have at least 7 characters");
            } 
        }

        if (this.errors.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}
// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};