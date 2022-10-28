
const express = require('express');
const {users} = require('./data/users.json');
//const {books} = require('books');
//const { json } = require('express');
const user_router = require('./routes/users'); // import user router**** node to specify the file name extension bcz it is a js file.... so automatically identify this as a js file
const books_router = require('./routes/books'); 
const app=express();
const port=8081;

app.use(express.json());
app.use(express.urlencoded());
app.use('/users',user_router);
app.use('/books',books_router);


app.listen(port,()=>{
    console.log('server started')
});