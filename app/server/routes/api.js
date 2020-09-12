const express = require('express');
const api = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/users').User;
const Users = require('../models/users').Users;
const Project = require('../models/projects').Project;
const Projects = require('../models/projects').Projects;

const usersFile = path.join(__dirname, '../users.json');
const projectsFile = path.join(__dirname, '../projects.json');

const getFileAsJson = (file) => {
    return JSON.parse(fs.readFileSync(file));
}

const saveJsonFile = (file, data) => {
    fs.writeFileSync(file, JSON.stringify({ data }));
}

const saveUsersDb = (data) => saveJsonFile(usersFile, data);
const saveProjectsDb = (data) => saveJsonFile(projectsFile, data);

const users = new Users();
users.data = getFileAsJson(usersFile).data;

const projects = new Projects();
projects.data = getFileAsJson(projectsFile).data;

const id = () => Math.random().toString(36).substring(2);

const handlePost = (success, errors, res) => {  
    if (success) {
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ status: 'error', errors });
    }
}

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ status: 'error', errors: 'Unauthorized Access' });
    }
}

api.post('/register', (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        matricNumber,
        program,
        graduationYear
    } = req.body;

    const user = new User(id(), firstname, lastname, email, password, matricNumber, program, graduationYear);
    const success = users.save(user);
    if (success) {
        saveUsersDb(users.data);
    }
    handlePost(success, users.errors, res);
});

api.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    const success = users.authenticate(email, password);
    if (success) {
        req.session.user = users.getByEmail(email);
    }
    handlePost(success, users.errors, res);
});

api.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ status: 'ok' });
});

api.get('/loggedin', (req, res) => {
    res.json(req.session.user);
});

api.get('/users', (req, res) => {
    res.json(users.getAll());
});

api.get('/users/:id', (req, res) => {
    res.json(users.getById(req.params.id));
});

api.post('/users/update', (req, res) => {
    const {
        id,
        obj
    } = req.body;

    const success = users.update(obj, id);
    handlePost(success, users.errors, res);
});

api.get('/projects', (req, res) => {
    res.json(projects.getAll());
});

api.get('/projects/showcase', (req, res) => {
    res.json(projects.getAll().slice(0, 4));
});

api.get('/projects/:id', (req, res) => {
    res.json(projects.getById(req.params.id));
});

api.post('/projects', requireLogin, (req, res) => {
    const {
        name,
        abstract,
        authors,
        tags
    } = req.body;

    const project = new Project(id(), name, abstract, authors, tags, req.session.user.id);
    const success = projects.save(project);
    if (success) {
        saveProjectsDb(projects.data);
    }
    handlePost(success, projects.errors, res);
});

api.post('/projects/update', (req, res) => {
    const {
        id,
        obj
    } = req.body;

    const success = projects.update(obj, id);
    handlePost(success, projects.errors, res);
});

api.get('/programs', (req, res) => {
    res.json([
        'Computer Science',
        'Computer Information Systems',
        'Computer technology'
    ]);
});

api.get('/graduationYears', (req, res) => {
    res.json([
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020'
    ]);
});

module.exports = api;