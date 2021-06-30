const express = require('express');
const projects = require('../services/project');
const router = express.Router();

router.get('/', async (req, res) => {

  // add code to render the Home Component, and pass in the projects  

  // as a props
  const user = req.session.user;
  const projectData = await projects.getAll()
  //console.log(projectData, "Blabla");
  res.render('Home',{projectData,user});
  
});

// router.post('/updateProject' , async (req, res) => {
//   //extract the id
//   const id = req.body.id;
//   console.log(id, "Id for project");
// })
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;