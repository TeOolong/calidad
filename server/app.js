const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000
app.set('view engine', 'ejs');

const { pool } = require("./database/config/config");
app.use(express.urlencoded({extended : false}))
app.use(bodyParser.json());

app.set('views', './views');
app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));

const userApi = require('./api/user');

app.get('/' ,(req, res) => {
    res.render('index');
});

/* app.get('/awa' ,(req, res) => {
    res.render('main');
}); */

app.post('/login', userApi.login);

app.post('/register', userApi.register);

app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})