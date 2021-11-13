const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(express.urlencoded({extended : true}));

app.set('views', './views');
app.set('layouts', './layouts');
app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));
app.use('/controllers', express.static('public/js/controllers'));

//APIs enlaces
const userApi = require('./api/user');
const noticeApi = require('./api/notice');
const medicoApi = require('./api/medico');
const comentApi = require('./api/coment');
//

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

app.get('/inicio' ,(req, res) => {
    if(true|| req.session.isAuth){
        res.render('inicio');
    }
    else {
        res.redirect('/');
    }
    
});
// APIs
app.post('/login', userApi.login);
app.post('/register', userApi.register);
app.get('/notices', noticeApi.getAllNotices);
app.get('/medicos', medicoApi.getAllMedicos);
app.post('/medico', medicoApi.getMedico);
app.get('/comentarios', comentApi.getAllComents);
//

app.get('/historial' ,(req, res) => {
    if(true || req.session.isAuth){
        res.render('historial');
    }
    else {
        res.redirect('/');
    }
    
});
app.get('/perfil' ,(req, res) => {
    if(true || req.session.isAuth){
        res.render('perfil');
    }
    else {
        res.redirect('/');
    }
    
});
//Historial clínico Persoanl GET

app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})