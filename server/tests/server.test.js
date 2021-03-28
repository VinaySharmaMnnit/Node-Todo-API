const expect = require('expect');
const request = require('supertest');

const {app} = require("../server");
const {Todo}= require("../models/Todo.js");

//this is used to empty database to test test cases
beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = "Test todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

    
   
    //this test case is for checking that we are not sending bad data

    it('should not create a todo for invalid body',(done)=>{
        //var text = "Test todo text";
        var data={};
        request(app)
        .post('/todos')
        .send(data)
        .expect(400)
        .end(done);
    });


   

});