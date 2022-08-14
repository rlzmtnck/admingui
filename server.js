const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');
const session = require("express-session");
// const { v4: uuidv4 } = require("uuid");
const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = 3000;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();
app.set('trust proxy', 1);
app.use(session({
    cookie:{
        secure: true,
        maxAge:60000
           },
    
    secret: 'secret', //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
    

}));
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))
const host = '0.0.0.0'
app.listen(PORT, host, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});