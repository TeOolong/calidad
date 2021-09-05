const express = require('express');
const app = express();
const PORT = 25565

app.use(express.static('public/views'));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));
app.use('/js', express.static('public/js'));

app.get('/' ,(req, res) => {
    res.render('index');
});


app.listen(PORT , () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})