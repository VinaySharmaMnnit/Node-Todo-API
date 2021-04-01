var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');

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



app.get('/todos',(req,res)=>{
    //to fetch all Todos
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findOne({
        _id:id
    }).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>res.status(400).send(e));

})

app.listen('3000',()=>{
    console.log('Starting on port 3000');
})

module.exports = {app};