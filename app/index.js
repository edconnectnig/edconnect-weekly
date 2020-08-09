require('dotenv').config();

const express = require('express');
const app = express();
const SERVER_PORT = 4000;

app.use(express.static('public'));

app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));
