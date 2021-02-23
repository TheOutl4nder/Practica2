const http = require('http');
const express = require('express');
const path=require('path');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');

const key = '6c9196426ffb45f88380c7a712d54849';

const app = express();
app.use(express.static(path.join(__dirname+'/Content')));
app.use(express.static(path.join(__dirname+'/Scripts')));

app.get('/',(req,res)=>{
    res.statusCode=200;
    res.sendFile(path.join(__dirname,'Views','index.html'));
})


app.get('/search/',(req,res)=>{
    console.log('on it');
    res.statusCode=200;
    const params= req.query;
    let url = 'https://newsapi.org/v2/everything?q=' + params.query + '&apiKey=' + key;
    fetch(url).then(resp=>resp.json())
    .then(json => res.send(json));
});

app.listen(3000);