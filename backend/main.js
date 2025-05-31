require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');


const port = process.env.PORT || 3000;
const app = express();



app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {sameSite: 'lax', secure: false, httpOnly:true}
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));


// define routes

const authRegister = require('./routes/authRegister');
const authLogin = require('./routes/authLogin');
const authLogout = require('./routes/authLogout');
const homepage = require('./routes/homepage');
const all_users = require('./users')

//landing page route
app.get('/', (req, res) => {
    res.redirect('/home.html');
});


//register
app.use('/auth', authRegister);


app.use('/auth', authLogin);


app.use('/api', authLogout);


app.use('/api', homepage);

app.listen(port, () => {
    console.log("Server listening on port "+port);
});