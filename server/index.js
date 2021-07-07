require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const register = require("@react-ssr/express/register");
const flash = require("express-flash");

var MongoDBStore = require('connect-mongodb-session')(session);
const SERVER_PORT = process.env.PORT || 3000;

const store = new MongoDBStore({
  uri:  "mongodb+srv://blossom123:vTjXsUW7CuaqU3t@cluster0.wlx9y.mongodb.net/project-explorer",
  collection: 'mySessions'
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

register(app).then(() => {

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store,
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use('/api', require('./routes/api'));
app.use("/", require("./controllers/home"));
app.use("/", require("./controllers/user"));
app.use("/", require("./controllers/project"));
app.use(express.static('public'));


app.listen(SERVER_PORT, () => console.log('Server listening on port ' + SERVER_PORT));

mongoose.set("bufferCommands", false);

 mongoose.connect(

   "mongodb+srv://blossom123:vTjXsUW7CuaqU3t@cluster0.wlx9y.mongodb.net/project-explorer", // connection string from .env file

   {

     useNewUrlParser: true,

     useUnifiedTopology: true,

     useCreateIndex: true,

   },

   // callback that’s called when connection succeeds or fails.

   (err) => {

     if (err) {

       console.log("Error connecting to db: ", err);

     } else {

       console.log(`Connected to MongoDB @ ${process.env.MONGODB_URI}`);

     }

   }

 );
})
