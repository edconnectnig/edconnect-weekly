const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName(){
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password){
        for (const obj of this.data) {
            if (obj.email === email && obj.password === password){
                return true;
            }
        }; 
        
        console.log("Invalid username and password");
        return true;
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
                console.log(`${property} should not be empty`);
                return false;
            }
        }

        if (this.getById(obj.id)){
            console.log(`A user with ID ${obj.id} already exists`);
            return false;
        }

        if (this.getByEmail(obj.email)){
            console.log(`A user with email address ${obj.email} already exists`);
            return false;
        }

        if (this.getByMatricNumber(obj.matricNumber)){
            console.log(`A user with matric number ${obj.matricNumber} already exists`);
            return false;
        }

        if(obj.password.length < 7){
            console.log("Your password should have at least 7 characters");
            return false;
        }

        return true;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};