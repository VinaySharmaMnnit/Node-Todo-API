const {User} = require('./../models/users');

var authenticate =(req,res,next)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
      if(!user){
        //res.status(401).send();
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next(); // "./users/me" is not accessible until next() is called
    }).catch((e)=>{
        res.status(401).send();
    });
}

module.exports = {authenticate}