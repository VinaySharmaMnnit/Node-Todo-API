var {mongoose}=require("../db/mongoose");

var Todo= mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creater:{           //this is used for private routing,without logging in no one can enter into it
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports = {Todo};