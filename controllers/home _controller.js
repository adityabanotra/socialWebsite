//module.export.actioname = function(re,res){}
const Post = require('../models/post')
module.exports.home = function(req, res){
   
    //console.log(req.cookies);
    Post.find({}).populate('user').exec(function(err,posts){
        if(err)
        console.log(err);

        return res.render('home',{
            title:'Home',
            posts: posts
    });
   
    });
   
}