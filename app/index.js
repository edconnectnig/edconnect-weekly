<<<<<<< HEAD
require('dotenv').config();

const express = require('express');
const app = express();
const SERVER_PORT = 4000;

app.use(express.static('public'));

app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));
=======
require('dotenv').config();

const express = require('express');
const app = express();
const SERVER_PORT = 4000;

app.use(express.static('public'));

app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));
>>>>>>> 08c3add73cafabe554a49aedbbaa53e66da92d90
