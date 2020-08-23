const DataModel = require('./data_model');
const util = require('../utils');

class User {
    constructor(firstname, lastname, email, password, matricNumber, program, graduationYear){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
        this.id = util.generate_random_id();
    }

    getFullName(){
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password){
        for (const obj of this.data) {
            if (obj.email === email && obj.password === password){
                return {
                    status : "ok",
                    error: null
                };
            }
        }; 
        
        return {
            status : "error",
            error : "Invalid username and password"
        };
    }

    getByEmail(email){
        for (const obj of this.data) {
            if (obj.email === email){
                return obj;
            }
        };
        return null;       
    }

    getByMatricNumber(matricNumber){
        for (const obj of this.data) {
            if (obj.matricNumber === matricNumber){
                return obj;
            }
        };
        return null;       
    }

    validate(obj){
        for (const property in obj) {
            if(obj[property] === ""){
                return {
                    status: "error",
                    error: `${property} should not be empty`
                };
            }
        }

        if (this.getById(obj.id)){
            return {
                status: "error",
                error: `A user same ID ${obj.id} already exists`
            };
        }

        if (this.getByEmail(obj.email)){
            return {
                status: "error",
                error: `A user with email address ${obj.email} already exists`
            };
        }

        if (this.getByMatricNumber(obj.matricNumber)){
            return {
                status: "error",
                error: `A user with matric number ${obj.matricNumber} already exists`
            };
        }

        if(obj.password.length < 7 || !obj.password.match(/^[a-zA-Z0-9]+$/)){
            return {
                status: "error",
                error: "Your password should be alphanumeric and have at least 7 characters"
            };
        }

        return {
            status: "ok",
            error: null
        };
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};