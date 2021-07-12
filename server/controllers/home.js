const express = require('express');
const projects = require('../services/project');
const viewProject = require('../services/viewProject');
const router = express.Router();

router.get('/', async (req, res) => {

  const user = req.session.user;
  const projectData = await projects.getAll();
  const allFourProjects = projectData.slice(-4).reverse();//limits the projects to the last four
  let projectsUserViewed = '';
 
  /**Checks if a user is logged in and finds all project the user has viewed */
  if (user !== undefined){
    projectsUserViewed = await viewProject.findAllViewedProjectsOfCurrentUser(user._id);
   
    allFourProjects.forEach(async (project) => {
        project.lastVisited = null;
        let viewedData = projectsUserViewed.find((obj) => obj.projectId.equals(project._id));

        if (viewedData) {
            project.lastVisited = viewedData.date;
            await project.save()
        }
    });
  }
  res.render('Home', { allFourProjects, user });

});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;