const express=require('express');
const {books}= require('../data/books.json');
const {users}= require('../data/users.json');
const router=express.Router();


router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:books,
    });
});
router.get('/book_details/:id',(req,res)=>{
    const {id}=req.params;
    const book_data=books.find((each)=>each.id===Number(id));
    if(!book_data){
        return res.status(404).json({
            success:false,
            message:'Book not found',
        });
    }
    res.status(200).json({
        message:'Book found',
        data:book_data,
    });
});


router.post('/add',(req,res)=>{
    const {id,title,author,issue_date}=req.body;
    const book=books.find((each)=>each.id===id);
    if(!book){
        books.push({
            id,
            title,
            author,
            issue_date,
        });
        return res.status(200).json({
            success:true,
            data:books,
    });
 }
    return res.status(404).json({
        message:'Book already exist',
    });
});

router.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===Number(id));
    if(!book){
        res.status(404).json({
            success:false,
            message:'Book not found',  
      });
    }
    const book_name=book.title;
    
    const book_index= books.indexOf(book);
    books.splice(book_index,1);
    return res.status(200).json({
        success:true,
        data:books,
        message:`The book titled ${book_name} has been deleted`,
    });

});
router.put('/update/:id',(res,req)=>{
    console.log('*************')
    console.log(req.params,'<=====');
    const {id} = req.params;
    const {data} = req.body;
    console.log(data,'<====');
    const book = books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:'Book not found',
        });
    }
    const book_update=books.map((each)=>{
        if(each.id===Number(id)){
            return {
                ...each,
                ...data,
            };   
        }
        return each;
    })
    

    });
router.get('/issuedBooks',(req,res)=>{
    const userWithIssued_books=users.filter((each)=>{
        if(each.issued_books)
        return each;
    });
    const issued_book_list=[];
    userWithIssued_books.forEach((each=>{
        const book=books.find((book)=>book.id===each.issued_books); 
        book.issue_date=each.issued_date;
        book.return_date=each.return_date;
        book.issued_by=each.name;
        issued_book_list.push(book);
    }));
    if (issued_book_list.length===0){
        return res.status(404).json({
            success:false,
            message:'No books issued',
        });
    }
    return res.status(200).json({
        success:true,
        data:issued_book_list,
    })
})



module.exports=router;// defualt export
