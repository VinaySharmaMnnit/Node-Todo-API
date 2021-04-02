const {ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('../server/models/users');

/*Todo.remove({}).then((result)=>{
    console.log(result);
}) */

/*Todo.findOneAndRemove({
    text:"This is from Postman"
}).then((result)=>{
    console.log(result);
}); */

Todo.findByIdAndRemove('6066bd86b069cde815feefdd').then((result)=>{
    console.log(result);
})