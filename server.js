const express = require('express');
const cors = require('cors');
const app = express();



// adding middlewares & parse the body 

app.use(express.json());
app.use(cors());


module.exports = app ;