const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({

    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email:email}, function(err,user){
            if(err) 
            {
                console.log('Error i finding user --> Passport');
                return done(err);
            }
            if(!user || user.password!=password)
            {
                console.log('Invalid username/password');
                return done(null,false);
            }
            console.log('imhere');
            return done(null,user);
        });
    }

));

//serialising the user to decide which key is to be kept in the cookies

 passport.serializeUser(function(user,done){
     done(null,user.id);
 })
//seserializing the user from cookies

passport.deserializeUser(function(id,done){
    User.findById(id ,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user -->Passport');
        }
        return done(null,user);
    });
});



//check if user is aunthetiaction

passport.checkAuthentication = function(req, res ,next)
{
    //if user is signed in , pass request to function
    if(req.isAuthenticated())
    {
        return next();
    }

    //if user is not signed in
    console.log('not signed in');
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req,res,next)
{   console.log('yoooo');
    if(req.isAuthenticated()){
        //req.user contaains details of signed in user from session cookie
        res.locals.user = req.user;
        console.log(req.locals.user);
    }
    next();
}  
module.exports = passport;