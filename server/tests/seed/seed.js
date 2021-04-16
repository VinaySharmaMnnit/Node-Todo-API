const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/users');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
var users = [{
    _id:userOneId,
    email:'vinay@gmail.com',
    password:'userOnePass',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]},
    {
        _id:userTwoId,
        email:'vinay2@gmail.com',
        password:'userTwoPass'
        
    }

]




var todos = [{
    _id: new ObjectID,
    text:"First todo"
},{
    _id: new ObjectID,
    text:"second todo",
    completed:true,
    completedAt:332
}];

const populatetodos = (done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos)
        .then(()=>done());
    }).catch((e)=>done(e));
};

const populateusers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo =new User(users[1]).save();

        return Promise.all([userOne,userTwo])
    }).then(()=>done());
}

module.exports ={todos,populatetodos,users,populateusers};