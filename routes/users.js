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
router.get('user/:id',(req,res)=>{
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
//get all users subscription details

router.get('/subscription-details/:id',(req,res)=>{
    console.log(req.params,'id');
    const {id}=req.params;
    const user=users.find((each)=>each.id===Number(id));
    if(!user){
        return res.status(404).json({
            success:false,
            message:'User not found',
        });
    }
    const getDate_inDays=(data="");
    let date;
    if(data===""){
        //current date
        date=new Date();
    }
    else{
        //getting date on the basis of data variable
        date=new Date(data);
    }
    let days=Math.floor(date.getTime()/(1000*60*60*24));
    return days;
});

const subscriptionType = (date)=>{
    if(user.subscriptionType==="Basic"){
        date= date + 90;
    }else if (user.subscriptionType==="Standard"){
        date= date + 180;
    }else if (user.subscriptionType==="Premium"){
        date= date + 365;
    }
    return date;
    //subscription expiration calculation
    //january 1st 1970, UTC // milliseconds
    let returnDate = getDate_inDays.returnDate;
    let currentDate = getDate_inDays();
    let subscription_date = getDate_inDays(user.subscription_date);
    let subscription_expiration = subscriptionType(subscription_date);

    const data =  {
        ...user,
        subscription_expired : subscription_expiration < currentDate,
        dayleftforSubscription : 
        subscription_expiration <= currentDate ? 0 : subscription_expiration - currentDate,
        
        fine:
        returnDate <  currentDate 
        ? subscription_expiration <= currentDate 
        ? 200 
        :100 
        :0,
    };
    res.status(200).json({
        success:true,
        data,
    });
};

module.exports=router;// defualt export
