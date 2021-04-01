const {MongoClient,ObjectID}= require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
       return  console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to mongodb");

    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count is ${count}`);
    })
   
   /* db.collection('Todos').find({active:true}).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log(err);
    });*/

    //db.collection('Users').find({name:"Roy"}).toArray().then((docs)=>{
      //  console.log(JSON.stringify(docs));
    //})

    db.close();
    
})