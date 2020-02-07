const express = require('express');
const app = express();

app.use('/', (req,res) => {
  res.send('hello people');
})

module.exports = app;