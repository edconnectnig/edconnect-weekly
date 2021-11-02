const DataModel = require("./data_model")

class User {
  constructor(
    id,
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  ) {
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
    return `${this.firstname} ${this.lastname}`
  }
}

class Users extends DataModel {
  authenticate(email, password) {
    let user = this.data.find(
      (obj) => obj.email === email && obj.password === password
    )
    if (user) {
      return true
    } else {
      return false
    }
  }

  getByEmail(email) {
    let user = this.data.find((obj) => obj.email === email)
    if (!user) {
      return null
    }
    return user
  }

  getByMatricNumber(matricNumber) {
    let user = this.data.find((obj) => obj.matricNumber === matricNumber)
    if (!user) {
      return null
    }
    return user
  }

  validate(obj) {
    this.errors = []
    let isEmpty = Object.keys(obj).filter(
      (key) => obj[key] === null || obj[key] === ""
    )
    let userByEmail = this.data.find((myObj) => myObj.email === obj.email)
    let userByMatric = this.data.find(
      (myObj) => myObj.matricNumber === obj.matricNumber
    )

    if (isEmpty.length > 0) {
      isEmpty.forEach((item) => this.errors.push(item + " should not be empty"))
    }

    if (userByEmail) {
      this.errors.push("A user with specified email address already exists")
    }

    if (userByMatric) {
      this.errors.push("A user with specified matric number already exists")
    }

    if (obj.password.length < 7) {
      this.errors.push("Password should have at least 7 characters")
    }

    if (this.errors.length === 0) {
      return true
    } else {
      return false
    }
  }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
  User,
  Users,
}
