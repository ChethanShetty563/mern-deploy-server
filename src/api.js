
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const app = express();
const router = express.Router();
const cors = require('cors');
require('dotenv').config();



app.use(express.json());
app.use(cors());

mongoose.connect(''mongodb+srv://chbm:chbm@cluster0.gjwx3oq.mongodb.net/deploy');

router.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
