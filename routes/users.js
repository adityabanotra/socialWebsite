const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get('/profile' , passport.checkAuthentication,usersController.profile);

router.get('/login',usersController.login);
router.get('/signout',usersController.destroySession);

//use pasport as a middleware 
router.post('/create',usersController.create);


router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/login'} 

    ),usersController.createSession);

router.post('/signout',usersController.createSession);


module.exports = router; 