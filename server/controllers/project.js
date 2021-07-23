const express = require('express');
const url = require('url');
const router = express.Router();
const project = require('../services/project');
const users = require('../services/user');
const viewProject = require('../services/viewProject');

router.get('/projects/submit', (req, res) => {
    let errors = req.flash('errors');
    let body = req.flash('body');
    if (req.session.user === undefined) {
        res.redirect('/login');
    } else if (req.session.user !== undefined) {
        const user = req.session.user;
        res.render('CreateProject', { user, errors, body });
    }
});

router.post('/projects/submit', async (req, res) => {
    req.flash('body', req.body);
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authors = req.body.authors.split(',');
    const tags = req.body.tags.split(',');
    const createdBy = req.session.user._id;
    const lastVisited = null;
    const result = await project.create({ name, abstract, authors, tags, createdBy, lastVisited });

    if (result[0] === true) {
        res.redirect('/');
    } else if (result[0] === false) {
        req.flash('errors', result[1]);
        res.redirect('/projects/submit');
    }
});

router.get('/project/:id', async (req, res) => {
    const current_user = req.session.user;

    if (current_user !== undefined) {
        const id = req.params.id;
        const project_by_id = await project.getById(id);
        const user = await users.getById(project_by_id.createdBy._id);
        await project.saveProjectDetails(project_by_id, current_user);

        res.render('Project', { project_by_id, user, current_user });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/projects/search', async (req, res) => {
    const current_user = req.session.user;
    let result = []
    const url_page = req.url;
    var q = url.parse(url_page, true)
    var searchTerm = q.query.searchTerm || '';
    var searchBy = q.query.search_by || '';
    /*
    checks if the searhTerm ends with a #. I set this functionality because
    if a project tag has a '#' at the beginning and i search for that project
    then everything after the '#' in the url query becomes a comment and thats 
    affects my output. So i removed it from the begeinning and added it to the end
    as that is my last value in my url query.
    */
    if (searchBy && searchBy === "tags" && searchTerm && searchTerm.endsWith("#")) {
        searchTerm = "#" + searchTerm;
        result = await project.getSearchProjectResults(searchTerm, searchBy);
    }else{
        result = await project.getSearchProjectResults(searchTerm, searchBy);
    }

    if (result && current_user != undefined) {
        result = await viewProject.updatedProjectsWithTheirLastVisitedToBePassedToTheView(current_user._id, result);
    }

    let count = await project.countProjects(searchTerm, searchBy);
    res.render('SearchPage', { result, searchTerm, current_user, searchBy, count });
});

/**this route was created for the next and previous page. Though it looks like the '/projects/search' route 
 * and this route do the same thing. There's some sort of conflict with the res.send() and res.render()
 * And this affects my output so I had to differentiate them. I'm open to suggestions
 */
router.get('/projects/next', async (req, res) => {
    const current_user = req.session.user;
    var pageSize = req.query.pageSize;
    var pageIndex = req.query.pageIndex;
    var searchTerm = req.query.searchTerm || '';
    var searchBy = req.query.search_by || '';
    let result = await project.getSearchProjectResults(searchTerm, searchBy, pageIndex, pageSize);

    if (searchBy && searchBy === "tags" && searchTerm && !searchTerm.startsWith("#"))
        searchTerm = "#" + searchTerm;

    if (current_user != undefined && result) {
        result = await viewProject.updatedProjectsWithTheirLastVisitedToBePassedToTheView(current_user._id, result);
        res.send(result);
    }
});

module.exports = router;