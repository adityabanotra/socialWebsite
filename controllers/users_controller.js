const User = require('../models/user');
const fs= require('fs');
const path = require('path');

module.exports.profile = function(req,res){
   
    User.findById(req.params.id,function(err,user){
        if(err){console.log(err);return;}
        return res.render('profile',{
            title : 'profile',
            profile_user: user
        });   
    });
          
            
           
}

module.exports.update = async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('****Multer error****');

                }
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file)
                {
                   if(user.avatar){
                       fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                   }
                    //saving the path of uploaded file
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
        }

        catch(err){
            req.flash('error',error);
            return res.redirect('back');
        }
        
    }
        else
        {
            req.flash('error', 'Unautharised!');
            return res.status(401).send('Unauthorised');
        }

    
    
}  


module.exports.login = function(req,res){
    return res.render('login',{
        title : "signin/signup"
    })
    // res.end('<h1>USer Profile</h1>');
}

module.exports.create = function(req,res)
{
    // console.log(req);
    if(req.body.password != req.body.cpassword)
    {
        console.log('noot matched');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user:'),err};
    

    if(!user)
    {
        User.create(req.body,function(err,user)
        {
            if(err){console.log('error in creating user:'),err};
        })
     
        // res.cookie('user_id', user.id);
        return res.redirect('/profile');
    }
    else
    {
        return res.redirect('back')
    }
})
} 


module.exports.createSession= function(req,res)
{
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

module.exports.destroySession= function(req,res)
{
    req.logout();
    req.flash('success', ' You have Logged out ');
    return res.redirect('/');
}