const http = require('http');
const express = require('express');
const path=require('path');
const fetch = require('node-fetch');
const exphbs = require('express-handlebars');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT;
const key = process.env.API_KEY;
const mongouri=process.env.MONGO_URL;

const app = express();

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname+'/Content')));
app.use(express.static(path.join(__dirname+'/Scripts')));

app.get('/',(req,res)=>{
    res.statusCode=200;
    res.sendFile(path.join(__dirname,'Views','index.html'));
})

app.get('/form.html',(req,res)=>{
    res.statusCode=200;
    res.sendFile(path.join(__dirname,'Views','form.html'));
})

app.post('/form.html',async (req,res)=>{
    res.statusCode=200;
    let form=req.body;
    MongoClient.connect(mongouri, { useUnifiedTopology: true }, async function(err, client) {
        if(err) {
             console.log('Error\n',err);
        }
        console.log('Connected to Mongo');
        const collection = client.db("news_app").collection("user");
        await collection.insertOne({user: form.user, email: form.email, password: form.password});
        client.close();
     });
     res.sendFile(path.join(__dirname,'Views','form.html'));
})

app.get('/search/',(req,res)=>{
    console.log('on it');
    res.statusCode=200;
    const params= req.query;
    let url = 'https://newsapi.org/v2/everything?q=' + params.query + '&apiKey=' + key;
    fetch(url).then(resp=>resp.json())
    .then(json => res.send(json));
    console.log("done!");
});



app.listen(port);