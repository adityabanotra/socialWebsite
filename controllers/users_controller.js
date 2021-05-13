const User = require('../models/user');

module.exports.profile = function(req,res){
    console.log('oiu');
                return res.render('profile',{
                    title : 'profile'
                })     
            
           
}




module.exports.login = function(req,res){
    return res.render('login',{
        title : "signin/signup"
    })
    // res.end('<h1>USer Profile</h1>');
}

module.exports.create = function(req,res)
{
    console.log(req);
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
     
        res.cookie('user_id', user.id);
        return res.redirect('users/profile');
    }
    else
    {
        return res.redirect('back')
    }
})
} 







module.exports.createSession= function(req,res)
{
    return res.redirect('/');
}