const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(express.urlencoded({extended : true}));

app.set('views', './views');
app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));

const userApi = require('./api/user');

app.use(
    session({
        secret: "Patentado por Abaco",
        resave: false,
        saveUninitialized: false
    })
)

app.get('/' ,(req, res) => {
    res.render('index');
});

app.get('/main' ,(req, res) => {
    if(req.session.isAuth){
        res.render('main');
    }
    else {
        res.redirect('/');
    }
    
});

app.post('/login', userApi.login);

app.post('/register', userApi.register);


app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})