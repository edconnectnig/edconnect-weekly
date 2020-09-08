const assert = require('assert');
const User = require('./server/models/users').User;
const Users = require('./server/models/users').Users;
const Project = require('./server/models/projects').Project;
const Projects = require('./server/models/projects').Projects;


let john = new User(id(), 'john', 'doe', 'johndoe@gmail.com', 'pass123', '06/1144', 'Comp Tech', '2020');
let james = new User(id(), 'james', 'doe', 'johndoe@gmail.com', 'pass123', '06/1145', 'Comp Tech', '2020');
let judas = new User(id(), 'judas', 'doe', 'judas@gmail.com', 'pass123', '06/1144', 'Comp Tech', '2020');
let jerry = new User(id(), 'jerry', 'doe', 'jerry@gmail.com', 'pass', '06/1146', 'Comp Tech', '2020');
let jones = new User(id(), 'jones', 'doe', 'jones@gmail.com', 'pass123', '06/1147', 'Comp Tech', '2020');
let empty = new User(id(), '', '', '', '', '', '', '');
let users = new Users();

assert(users.save(john) === true, `saving a user should return true for a valid user`);
assert(users.save(jones) === true, `saving a user should return true for a valid user`);
assert(users.save(james) === false, `saving a user should return false for an invalid user : duplicate email`);
assert(users.save(judas) === false, `saving a user should return false for an invalid user : duplicate matric number`);
assert(users.save(jerry) === false, `saving a user should return false for an invalid user : password length less than 7`);
assert(users.save(empty) === false, `saving a user should return false for an invalid user : empty properties`);
assert(users.getAll().length === 2, `users.getAll() method should return 2`);
assert(users.getById(john.id).getFullName() === 'john doe');
assert(users.getByEmail(john.email).getFullName() === 'john doe');
assert(users.getByMatricNumber(john.matricNumber).getFullName() === 'john doe');
assert(users.authenticate(john.email, john.password) === true);
assert(users.update({ firstname: 'jane' }, john.id) === true);
assert(users.getById(john.id).getFullName() === 'jane doe', `user detail is not being updated by the update method`)
assert(users.delete(jones.id) === true);
assert(users.getById(jones.id) === null, `deleted user should no longer be avaiable in the data array. The getById method should now return null for the specified id`)
assert(users.getAll().length === 1);


let edconnect = new Project(id(), 'edconnect', 'Some project description', ['efe amad'], ['tech'], 'efe amad');
let capex = new Project(id(), 'capex', 'Some project description', ['efe amad'], ['tech'], 'efe amad');
let busa = new Project(id(), 'busa', 'Some project description', 'author', 'tag', 'efe amad');
let winslow = new Project(id(), '', '', ['efe amad'], ['tech'], '');
let projects = new Projects();

assert(projects.save(edconnect) === true, `saving a project should return true for a valid project`);
assert(projects.save(capex) === true, `saving a project should return true for a valid project`);
assert(projects.save(busa) === false, `saving a project should return false for an invalid project : tags and authors should be of the type array`);
assert(projects.save(winslow) === false, `saving a project should return false for an invalid project : empty properties`);
assert(projects.getAll().length === 2, `projects.getAll() method should return 2`);
assert(projects.update({ authors: ['tola', 'kunle'], tags: ['ed', 'teach', 'connect'] }, edconnect.id) === true);
assert(projects.getById(edconnect.id).authors.length === 2, `project detail is not being updated by the update method`);
assert(projects.getById(edconnect.id).tags.length === 3, `project detail is not being updated by the update method`);


function id(){
    return Math.random()
                .toString(36)
                .substring(2);
}