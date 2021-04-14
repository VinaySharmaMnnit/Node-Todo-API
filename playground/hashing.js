const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     })
// })

var hashpass = '$2a$10$ZY67Ev4zTcazqiW4.RHjy.7qj4W8m3EZdRX0aOAc/lQDP3gqNbVTa';

bcrypt.compare(password,hashpass,(err,res)=>{
    console.log(res);
})






// var data={
//     id:4

// }

// var token = jwt.sign(data,'123abc');
// console.log(token);

// //jwt.verify is used to verify the token with the given value

// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);



/*const {SHA256} = require('crypto-js');

var message = "I am user";

var hash = SHA256(message).toString();
console.log(message);

console.log(hash);

var data={
    id:4
}

var token = {
    data,
    hash:SHA256(JSON.stringify(data)+'secret').toString() //secret is added for security
}

// if hacker tries to change data then we are informed with the help of secret
//this addition of secret is known as SALTING if data

token.data.id = 5;

var reshash = SHA256(JSON.stringify(data)+'secret').toString();

if(token.hash===reshash){
    console.log("Data is secured");
}
else{
    console.log("Data is not secured");
} */
