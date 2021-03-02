const express = require('express');
const router = express.Router();
const school = require('../services/school');
const user = require('../services/user');

router.get('/signup', (req,res) => {
    const errors = req.flash('error_messages');
    var body = req.flash('input_body');
    const programs = school.getPrograms();
    const years = school.getGradYears();
    res.render('Signup', {programs,errors,years,body});
});

router.post('/signup',(req,res) => {
    req.flash('input_body',req.body);
    
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const matricNumber = req.body.matricNumber;
    const program = req.body.program;
    const graduationYear = req.body.graduationYear;
    const result = user.create({firstname, lastname, email, password, matricNumber, program, graduationYear});

    if(result[0] === true){
        req.session.user = result[1];
        res.redirect("/");
    }else if(result[0] === false){
        req.flash('error_messages', result[1]);
        res.redirect("/signup");
    }
});

router.get('/login',(req,res) => {
    const login_errors = req.flash('login_errors');
    const login_body = req.flash('login_body');
    res.render('Login',{login_errors,login_body});
});

router.post('/login',(req,res) => {
   req.flash('login_body',req.body);
   const email = req.body.email;
   const password = req.body.password;
   const result = user.authenticate(email,password);
   
   if(result[0] === true){
       req.session.user = result[1];
       res.redirect('/');
    }else if(result[0] === false){
        req.flash('login_errors',result[1]);
        res.redirect('/login');
    }
});

module.exports = router;