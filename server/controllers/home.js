const express = require('express');
const projects = require('../services/project');
const viewProject = require('../services/viewProject');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.session.user;
  let projectData = await projects.getLastFour();
 
  /**Checks if a user is logged in and finds gets all updated projects to be passed to the view*/
  if (projectData && user !== undefined){
    projectData = await viewProject.updatedProjectsWithTheirLastVisitedToBePassedToTheView(user._id, projectData);
  }
  
  res.render('Home', { projectData, user });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;