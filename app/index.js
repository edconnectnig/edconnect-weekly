global.User = require('./server/models/users').User;
global.Users = require('./server/models/users').Users;
global.Project = require('./server/models/projects').Project;
global.Projects = require('./server/models/projects').Projects;

/**
 * You can create class instances, and test class methods from the Node JS REPL
 * 
 * let efe = new User('efe', 'amad', 'efe@amad.com', 'pass123', '06/1144', 'Comp Tech', '2020');
 * efe.getFullName();
 * 
 * let users = new Users();
 * users.save(efe);
 * users.getAll();
 * users.authenticate('efe@amad.com', 'pass123');
 * users.getByEmail('efe@amad.com');
 * users.getByMatricNumber('06/1144');
 * 
 * let edconnect = new Project('edconnect', 'Some project description', ['efe amad'], ['tech'], 'efe amad');
 * 
 * let projects = new Projects();
 * projects.save(edconnect);
 * projects.getAll();
 */