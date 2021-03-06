require('./config/config');
const {SHA256} = require('crypto-js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');

const {mongoose}=require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');

const port = process.env.PORT;
var app = express();

app.use(bodyParser.json());

//post request to create a new Todo
app.post('/todos',authenticate,(req,res)=>{
   var todo = new Todo({
       text: req.body.text,
       _creater:req.user._id    //_creater is added to make this route private
   });

   todo.save().then((doc)=>{
       res.send(doc);
   },(e)=>{
       res.status(400).send(e);
   })
})



app.get('/todos',authenticate,(req,res)=>{
    //to fetch all Todos
    Todo.find({
        _creater:req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findOne({
        _id:id,
        _creater:req.user._id
    }).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>res.status(400).send(e));

})

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id:id,
        _creater:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    })
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_creater:req.user._id,_id:id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        return res.status(400).send(e);
    })


});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    //var hash = SHA256(body.password).toString();
    var user = new User(body);


    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })

});

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     })
// })

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=>{
      
       return user.generateAuthToken().then((token)=>{
           res.header('x-auth',token).send(user);
       })

    }).catch((e)=>{
        res.status(400).send();
    })

});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((e)=>{
        res.status(401).send();
    })
})

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
})

app.listen(port,()=>{
    console.log(`Starting on port ${port}`);
})

module.exports = {app};