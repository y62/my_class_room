const express = require("express");
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const port = 8080;

const app = require('express')();

const database = require('./database');
app.use(express.static("frontend"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'frontend/views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname + '/frontend/login.html'));
});

app.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        let encryptedPassword = "";
        function getClearPassword() {
            connection.query("SELECT password FROM students WHERE email = ?", [email, password], function (error, result, fields) {
                console.log(result);
                let passwordResult = JSON.stringify(result);
                return encryptedPassword = passwordResult.substring(14, 74);
            });
        }
        getClearPassword();

        connection.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            console.log(encryptedPassword);
            if (bcrypt.compareSync(password, encryptedPassword) === true)  {
                req.session.loggedin = true;
                req.session.email = email;
                emoil = email;
                res.redirect('/activity.html');
            } else {
                res.redirect("/");
            }
            res.end();
        });
    } else {
        res.redirect("/");
        res.end();
    }
});


app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});


app.get('/activity',(req,res)=>{
    if(req.session.loggedin){
        res.sendFile(path.join(__dirname + '/frontend/activity.html'));
    }
});


app.get('/home', (req, res) => {
   return res.sendFile('/frontend/home.html');
});


function confirmationMail(confirmationAcc) {

    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL, //
        to: confirmationAcc,
        subject: 'Welcome ' + confirmationAcc,
        text: 'Your account ' + confirmationAcc + ' has been successfully created!'
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Email not sent...');
        }
        return console.log('Confirmation sent...');
    });
}

app.get('/signup', (req, res) => {
        res.render('sign_up', {
            title: 'Create a user'
        });
});


app.post('/save',  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const encryptedPassword = req.body.password; //REMOVE ENCRYPTED PASS
    let password = bcrypt.hashSync(encryptedPassword, 10);
    // let password = hash.toString();
    const data = {name, email, password};
    let sql = "INSERT INTO students SET ?";
    connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
        confirmationMail(email);
    });
});

app.get('/chat', (req, res) =>{
    res.sendFile(__dirname + '/frontend/chat.html');
});

app.listen(port, () => {
    console.log("Server is running on port: ", port)
});