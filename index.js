const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded({extended :true}));

app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



//use express router
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name : 'codebook',
    //TODO change the secret bofore deployment
    secret : 'youaretherealhero',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }

}));



app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);
    }

    console.log(`Server runnning on ${port}`);
});