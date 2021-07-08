const nodeMailer = require('../config/nodemailer');

//this is another function of exporting a method
exports.newComent = (comment) =>{
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    console.log('inside newComment mailer', comment);
    console.log(comment.user);
    nodeMailer.transporter.sendMail({
        from : 'bookshelf.ind@gmail.com',
        to : comment.user.email,
        subject :'New Comment Published',
        html : htmlString
    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message sent',info);
        return;
    });
}