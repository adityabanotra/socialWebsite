//module.export.actioname = function(re,res){}
module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user' , 34);
    console.log(req.cookies);
    return res.render('home',{
        title:'home'
    });
   
}