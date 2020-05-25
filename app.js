const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const {saveUser, getAllUsers} = require('./services/user.service');


// Create server
app.use(express.json());
app.use(express.urlencoded());

// Create hbs
app.use(express.static(path.join(__dirname, 'views')));
app.engine('.hbs', handlebars({
    layoutsDir: 'views',
    defaultLayout: 'main-layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//Main
app.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.render('main');
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const {email, pass} = req.body;
    const users = await getAllUsers();
    const user = await users.findIndex(userToCompare => userToCompare.email === email && userToCompare.pass === pass);

    if (user < 0) {
        return res.render('login', {message: 'Email or password is not valid'});
    }
        await res.render('main', {message: `You are logged in now, ${users[user].name}`});
});

// Register
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const {name, email} = req.body;
    const users = await getAllUsers();
    const answer = await users.find(user => user.email === email);

    if (answer) {
        return res.render('register', {message: 'This email is already used'});
    }
        await saveUser(req.body);
        await res.render('main', {message: `Thank you for your registration! \n Welcome, ${name}!`});
});

// Users list
app.get('/users', async (req, res) => {
    const users = await getAllUsers();
    res.render('users', {users});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

// Run server
app.listen(5500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5500');
    }
});
