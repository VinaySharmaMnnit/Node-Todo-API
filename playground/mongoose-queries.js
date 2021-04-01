const {ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('../server/models/users');

/*var id="6065f64ec890f2f03dd7f1e4"
Todo.find({
    _id: id
}).then((todos)=>{
    console.log((todos));
})

Todo.findOne({
    completed:false
}).then((todos)=>{
    console.log(JSON.stringify(todos));
}) 

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found');
    }
    console.log(JSON.stringify(todo));
}).catch((e)=>{
    console.log(e);
}); */

var id="605a2aebbd7ecb841bdcec34";

User.findById(id).then((user)=>{
    if(!user){
       return console.log("user not found");
    }
    console.log(user);
}).catch((e)=>{
    console.log(e)
});