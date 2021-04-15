const expect = require('expect');
const request = require('supertest');

const {app} = require("../server");
const {Todo}= require("../models/Todo.js");
const { ObjectID } = require('mongodb');
const {todos,populatetodos,users,populateusers} = require('./seed/seed.js');

//this is used to empty database to test test cases
beforeEach(populateusers);
beforeEach(populatetodos);

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
            Todo.find({text}).then((todos)=>{
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
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    });


   

});

describe('GET /todos',()=>{
    it('should GET all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);

    })
});

describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        var hexId=new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object id',(done)=>{
        request(app)
        .get('/todos/123abdc')
        .expect(404)
        .end(done);
    })

});

describe('DELETE/todos/:id',()=>{
    it('should delete todos with given id',(done)=>{
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todos)=>{
                expect(todos).toNotExist();
                done();
            }).catch((e)=>{
                done(e);
            })
        })

    });
    it('should return 404 if todo not found',(done)=>{
        var hexId=new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object id',(done)=>{
        request(app)
        .get('/todos/123abdc')
        .expect(404)
        .end(done);
    })
});

describe('UPDATE /todos/id',()=>{
    it('should update the todo',(done)=>{
        var id = todos[0]._id.toHexString();
        var text ="From tests";
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text,
            completed:true
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });
    it('should update the comletedAt when completed is false',(done)=>{
        var id = todos[1]._id.toHexString();
        var text = "From tests";
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text,
            completed:false
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);


    })
})