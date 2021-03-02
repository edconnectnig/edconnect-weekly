const express = require('express');
const router = express.Router();
const project = require('../services/project');
const users = require('../services/user');

router.get('/projects/submit',(req,res) => {
    const errors = req.flash('errors');
    const body = req.flash('body');
    if(req.session.user === undefined){
        res.redirect('/login');
    }else if(req.session.user !== undefined){
        const user = req.session.user;
        res.render('CreateProject',{user,errors,body});
    }
});

router.post('/projects/submit',(req,res) => {
    req.flash('body',req.body);
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authors = req.body.authors.split(',');
    const tags = req.body.tags.split(' ' || ',');
    const createdBy = req.session.user.id;
    console.log(createdBy,"CreatedBy");
    const result = project.create({name,abstract,authors,tags,createdBy});
   
    if(result[0] === true){
        res.redirect('/');
    }else if(result[0] === false){
        req.flash('errors',result[1]);
        res.redirect('/projects/submit');
    }
});

router.get('/project/:id', (req,res) => {
    const current_user = req.session.user;
    console.log(current_user, "Current user")
    const id = req.params.id;
    const project_by_id = project.getById(id);
    console.log(project_by_id,"Project");
    const user = users.getById(project_by_id.createdBy);
    console.log(user,"User");
    res.render('Project',{project_by_id,user,current_user});
});

module.exports = router;