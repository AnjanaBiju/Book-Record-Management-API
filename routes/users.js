const express=require('express');
const {users}= require('../data/users.json');
const router=express.Router();

//To get all users details
router.get('/users',(req,res)=>{
    
    res.status(200).json({
        success:true,
        data:users,
    });
});
//For wrong urls or path
router.get('*',(req,res)=>{
    
    res.status(200).send({
        message:'This page is not exist',
    });
});
//To get the details of a user by their id
router.get('/:id',(req,res)=>{
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
router.post('/users_signup',(req,res)=>{
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
router.delete('/users_delete/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);//unwanted
    user_id=Number(id)//unwanted
    const user=users.find((each)=>each.id===user_id);
    users.find((each)=>{//unwanted
        console.log(each.id,"<====")//unwanted
        console.log(Number(id),"<====")//unwanted
    })//unwanted
    console.log("===>",user);//unwanted
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User not found',
        });
    }
    index=users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        message:"deleted successfully",
    });
})
router.put('/user_update/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    console.log(req.body,'<====')
    const user= users.find((each)=>each.id===Number(id));
    console.log("==>")
    if(!user)
    return res.status(404).json({
        success:false,
        message:"User Not Found",
    });
    
    const updateuser=users.map((each)=>{
        if(each.id===Number(id)){
            console.log("==> executed")
            return{
                ...each,
                ...data,
            }
            return each;
        }
    });
    return res.status(200).json({
        success:true,
        data:updateuser,
    });
});

module.exports=router;// defualt export
