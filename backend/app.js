const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

mongoose
  .connect('mongodb+srv://birametgod:JYhW2K6qkOAjAGAk@cluster0-c7tiq.mongodb.net/test?retryWrites=true&w=majority/superMalt', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`connected to database`);
  })
  .catch(() => {
    console.log('Connection failed !');
  });

app.use("/api/user", userRoutes);

module.exports = app;