const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const users = [
    {email: '111@mail.com', pass: '111'},
    {email: '222@mail.com', pass: '222'},
    {email: '333@mail.com', pass: '333'},
    {email: '444@mail.com', pass: '444'},
    {email: '555@mail.com', pass: '555'},
];

// Create server
app.use(express.json());
app.use(express.urlencoded());

// Create hbs
express.static(path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({defaultLayout: false, extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//Main
app.get('/', (req, res) => {
    res.render('main');
})

// Login
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/log', (req, res) => {
    const {email, pass} = req.body;
    let isExist = users.find(user => user.email === email && user.pass === pass)
        if (isExist) {
            res.render('main', {message: 'You are logged in now'});
    } else {
            res.render('login', {message: 'Email or password is not valid'});
        }
});

// Register
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/reg', (req, res) => {
    let isUsed = users.find(user => user.email === req.body.email)
        if (isUsed) {
            res.render('register', {message: 'This email is already used'});
        } else {
            users.push(req.body);
            res.render('main', {message: 'Thank you for your registration!'});
            console.log(users);
        }
});

// Users list
app.get('/users', (req, res) => {
    res.render('users', {users});
});

// Run server
app.listen(5500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5500');
    }
})
