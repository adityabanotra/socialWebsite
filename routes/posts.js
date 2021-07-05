const express = require('express');
const passport = require('passport');
const router = express.Router();
const pass = require('passport');

const postController = require('../controllers/post_controller');

router.post('/create',postController.create);
router.get('/destroy/:id', postController.destroy);



module.exports = router; 