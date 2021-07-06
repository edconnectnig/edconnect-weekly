const express = require('express');
const url = require('url');
const router = express.Router();
const project = require('../services/project');
const users = require('../services/user');

router.get('/projects/submit',(req,res) => {
    const errors = req.flash('errors');
    console.log(errors, "Get errors");
    const body = req.flash('body');
    if(req.session.user === undefined){
        res.redirect('/login');
    }else if(req.session.user !== undefined){
        const user = req.session.user;
        res.render('CreateProject',{user,errors,body});
    }
});

router.post('/projects/submit', async (req,res) => {
    req.flash('body',req.body);
   console.log(req.body, "Body")
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authors = req.body.authors.split(',');
    const tags = req.body.tags.split(',');
    const createdBy = req.session.user._id;
    const lastVisited = null;
    const result = await project.create({name,abstract,authors,tags,createdBy,lastVisited});
    console.log(result,"Result")
    if(result[0] === true){
        res.redirect('/');
    }else if(result[0] === false){
        req.flash('errors',result[1]);
        res.redirect('/projects/submit');
    }
});

router.get('/project/:id', async (req,res) => {
    const current_user = req.session.user;
    const id = req.params.id;
    const project_by_id = await project.getById(id);
    const user = await users.getById(project_by_id.createdBy._id);
    res.render('Project',{project_by_id,user,current_user});
});

router.get('/projects/search', async(req, res) => {
    let result = ''
    const url_page = req.url;
    var q = url.parse(url_page, true)
   
    var searchTerm = q.query.searchTerm;
    var searchBy = q.query.search_by;
    switch(searchBy){
        case 'name':
            result = await project.getProjectsByName(searchTerm);
            break;
        case 'abstract':
            result = await project.getProjectsByAbstract(searchTerm);
            break;
        case 'authors':
            result = await project.getProjectsByAuthors(searchTerm);
            break;
        case 'tags':
            if(!searchTerm.startsWith("#"))
            searchTerm = "#" + searchTerm;
            result = await project.getProjectsByTags(searchTerm);
            break;
    }
    res.render('SearchPage', {result, searchTerm});
});


module.exports = router;