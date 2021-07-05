const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware')
// const sass= require('sass');

// app.use(sass({
//     src : '/assets/css',
//     dest : 'assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix : '/css'
// }));
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(cookieParser());

app.use('/uploads', express.static(__dirname+'/uploads'));


//use express router


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
     },
    // store: mongoStore.create({
    //     mongooseConnection : db,
    // }),
    store: new MongoStore({
        mongoUrl: ('mongodb://localhost/social'),
        autoRemove: 'disabled'
    }),
    function(err)
    {console.log(err)}
    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setflash);

app.use('/', require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);
    }

    console.log(`Server runnning on ${port}`);
});