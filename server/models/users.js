const {mongoose}=require("../db/mongoose.js");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true , //this would not allow same email twice in database
        validate:{
            validator:validator.isEmail,
            message:"{VALUE} is not an email",
            isAsync:false
        }
    },
    password:{
        type:String,
        required: true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

UserSchema.methods.toJSON= function(){
    var user = this;
    var UserObject = user.toObject();
    return _.pick(UserObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens = user.tokens.concat({access,token});
    return user.save().then(()=>{
       // console.log("Hi");
        return token;
    })
}

//statics is used to convert a user defined method into instance method.
UserSchema.statics.findByToken = function(token){
    var User =this;
    var decoded;
    try{
      decoded = jwt.verify(token, 'abc123');
    }catch(e){return Promise.reject()}
    return User.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

//this function runs before we save user to User
//this is a middleware it should be provided with (next) otherwise the program will crash

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     })
// })
UserSchema.pre('save',function(next){
    var user = this;
    var password = user.password;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

var User=mongoose.model('User',UserSchema);

module.exports ={User};
