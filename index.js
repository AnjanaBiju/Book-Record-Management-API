
const express = require('express');
const {users} = require('./data/users.json');
//const {books} = require('books');
//const { json } = require('express');
const app=express();
const port=8081;

app.use(express.json());
//To get all users details
app.get('/users',(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});
//For wrong urls or path
app.get('*',(req,res)=>{
    res.status(200).send({
        message:'This page is not exist',
    });
});
//To get the details of a user by their id
app.get('/users/:id',(req,res)=>{
    const user_id = req.params;
    const user_data = users.find((each)=>each.user_id===id);
    if(!user_data){
        return res.status(404).json({
            success:false,
            message:'User not found',
        });
    }
    return res.status(200).json({
        success:true,
        data:user_data,
    })
});
// to create a new user
app.post('/users_signup',(req,res)=>{
    const {id,name,email,subscription_date,subscription_type}=req.body;
    const user=users.find((each)=>each.id===id);
    if(!user){
        users.push({
            id,
            name,
            email,
            subscription_date,
            subscription_type, 
        });
        return res.status(200).json({
            success:true,
            message:"Updated",
            data:user,
        });
    }
    return res.status(404).json({
        success:false,
        message:'User already exist',
    });
});
app.listen(port,()=>{
    console.log('server started')
});