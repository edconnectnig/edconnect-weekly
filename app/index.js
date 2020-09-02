const assert = require('assert');
const User = require('./server/models/users').User;
const Users = require('./server/models/users').Users;
const Project = require('./server/models/projects').Project;
const Projects = require('./server/models/projects').Projects;

const id = () => Math.random().toString(36).substring(2);
const duplicateId = id();

let john = new User(duplicateId, 'john', 'doe', 'johndoe@gmail.com', 'pass123', '06/1144', 'Comp Tech', '2020');
let james = new User(id(), 'james', 'doe', 'johndoe@gmail.com', 'pass123', '06/1145', 'Comp Tech', '2020');
let judas = new User(id(), 'judas', 'doe', 'judas@gmail.com', 'pass123', '06/1144', 'Comp Tech', '2020');
let jerry = new User(id(), 'jerry', 'doe', 'jerry@gmail.com', 'pass', '06/1146', 'Comp Tech', '2020');
let jones = new User(duplicateId, 'jones', 'doe', 'jones@gmail.com', 'pass123', '06/1147', 'Comp Tech', '2020');
let empty = new User(id(), '', '', '', '', '', '', '');
let users = new Users();

assert(users.save(john) === true);
assert(users.save(james) === false);
assert(users.save(judas) === false);
assert(users.save(jerry) === false);
assert(users.save(jones) === false);
assert(users.save(empty) === false);
assert(users.getAll().length === 1);
assert(users.getById(john.id).getFullName() === 'john doe');
assert(users.getByEmail(john.email).getFullName() === 'john doe');
assert(users.getByMatricNumber(john.matricNumber).getFullName() === 'john doe');
assert(users.authenticate(john.email, john.password) === true);
assert(users.update({ firstname: 'jane' }, john.id) === true);
assert(users.getById(john.id).getFullName() === 'jane doe');
assert(users.delete(john.id) === true);
assert(users.getAll().length === 0);


let edconnect = new Project(duplicateId, 'edconnect', 'Some project description', ['efe amad'], ['tech'], 'efe amad');
let capex = new Project(duplicateId, 'capex', 'Some project description', ['efe amad'], ['tech'], 'efe amad');
let busa = new Project(id(), 'busa', 'Some project description', 'author', 'tag', 'efe amad');
let winslow = new Project(id(), '', '', ['efe amad'], ['tech'], '');
let projects = new Projects();

assert(projects.save(edconnect) === true);
assert(projects.save(capex) === false);
assert(projects.save(busa) === false);
assert(projects.save(winslow) === false);
assert(projects.getAll().length === 1);
assert(projects.update({ authors: ['tola', 'kunle'], tags: ['ed', 'teach', 'connect'] }, edconnect.id) === true);
assert(projects.getById(edconnect.id).authors.length === 2);
assert(projects.getById(edconnect.id).tags.length === 3);

