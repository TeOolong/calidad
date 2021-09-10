const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000
app.set('view engine', 'ejs');
const { pool } = require("./database/config/config");

const passport = require('passport');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy;

app.use(express.urlencoded({extended : true}));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal((dni,nombre,done)=>{
    return done(null, {id: dni, name: nombre})
}))
passport.serializeUser((user, done)=>{
    
    done(null, user.id);
});
passport.deserializeUser(async(id, done)=>{
    const results = await pool.query(`SELECT * FROM Cliente WHERE DNI =$1`, [id]);
    const user = results.rows[0];
    done(null, {id: user.dni, name: user.Nombre})
})


app.set('views', './views');
app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));

const userApi = require('./api/user');


app.get('/' ,(req, res) => {
    res.render('index');
});

app.get('/awa' ,(req, res) => {
    res.render('main');
});

app.post('/login', userApi.login);

app.post('/register', userApi.register);

app.post('/autentificado', passport.authenticate('local',{
    successRedirect: "/awa",
    failureRedirect: "/"
}) )

app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})