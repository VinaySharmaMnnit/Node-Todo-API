const {MongoClient,ObjectID}= require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
       return  console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to mongodb");
   
    db.collection('Users').insertOne({
        name:"Raja",
        Age: 21,
        location: "India"
    },(err,result)=>{
        if(err){
           return console.log("Unable to insert document",err);
        }
        console.log(JSON.stringify(result.ops,undefined,2))
    }
    )

    db.close();
    
})