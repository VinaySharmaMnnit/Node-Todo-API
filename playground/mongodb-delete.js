const {MongoClient,ObjectID}= require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
       return  console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to mongodb");

    /*db.collection('Users').deleteMany({Age: 21}).then((res)=>{
        console.log(res);
    })*/

    db.collection('Users').findOneAndDelete({Age:22}).then((result)=>{
        console.log(result);
    })


})

