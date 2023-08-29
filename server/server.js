const port = process.env.PORT || 3002;
// modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// middleware 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// cluster connection database
const mongoURI = "mongodb+srv://abddullahshah:PmVGaviHvnVQV5FM@cluster0.k9rzl1b.mongodb.net/"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('>>>>>>>>>======================== we re connected! 🚀 ========================>>>>>>>>>')
});

//route connect with main server file
app.use('/', require('./route/index'))
app.listen(port, () => console.log(`Server is listening on port ${port}`))