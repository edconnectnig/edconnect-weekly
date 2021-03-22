const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
            this.matricNumber = matricNumber;
            this.program = program;
            this.graduationYear = graduationYear;    
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`
    }
}

class Users extends DataModel {
    authenticate(email, password) {
    let validUser = this.data.find((element) => element.email === email && element.password === password)
      return (validUser? true : false); 
    }

    getByEmail(email) {
    let getEmail = this.data.find(ele => ele.email === email)
    return getEmail? getEmail : null;
    }

    getByMatricNumber(matricNumber) {
        let element = this.data.find(ele => ele.matricNumber === matricNumber)
        return element? element : null;
    }

    validate(obj) {
        let value = true;
        for(let prop in obj ){
            if(obj[prop] === null){
                value = false;
            }
        }
      let valEmail = this.data.find(ele => ele.email === obj.email)
      let valMatric = this.data.find(ele => ele.matricNumber === obj.matricNumber)
      let valPassword = obj.password.length >= 7;
      return value && valPassword && !valEmail && !valMatric;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};