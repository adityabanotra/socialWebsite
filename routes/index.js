const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home _controller')
console.log('route  loaded');

router.get('/',homeController.home);
router.use('/users' , require('./users'));
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));

// router.use('/post' , require('./posts'));

//for any further routes
// router.use('/routerName , require('./routerFile))
module.exports = router;

