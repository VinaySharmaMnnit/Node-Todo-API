var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/users');

var app = express();

app.use(bodyParser.json());

//post request to create a new Todo
app.post('/todos',(req,res)=>{
   var todo = new Todo({
       text: req.body.text
   });

   todo.save().then((doc)=>{
       res.send(doc);
   },(e)=>{
       res.status(400).send(e);
   })
})

app.listen('3000',()=>{
    console.log('Starting on port 3000');
})

module.exports = {app};