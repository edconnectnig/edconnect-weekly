require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const MongoDBStore = require("connect-mongodb-session")(session);

const register = require("@react-ssr/express/register");

const host = "0.0.0.0";
const port = process.env.PORT;

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

register(app).then(() => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.listen(port || 4000);

  const db =
    "mongodb+srv://spaceman:node-tut-db@node-tut.8hflk.mongodb.net/project-explorer";
  mongoose.set("bufferCommands", false);

  mongoose.connect(
    db, // connection string from .env file

    {
      useNewUrlParser: true,

      useUnifiedTopology: true,

      useCreateIndex: true,
    },

    (err) => {
      if (err) {
        console.log("Error connecting to db: ", err);
      } else {
        console.log(`Connected to MongoDB @ ${db}`);
      }
    }
  );

  app.use(morgan("combined"));
  app.use(flash());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(
    session({
      secret: "secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: store,
      resave: true,
      saveUninitialized: false,
    })
  );

  app.use("/api", require("./routes/api"));
  app.use("/", require("./controllers/home"));
  app.use("/", require("./controllers/user"));
  app.use("/", require("./controllers/project"));
  app.use(express.static("public"));
});