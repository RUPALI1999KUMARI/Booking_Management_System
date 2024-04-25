const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const hashPassword = require('../middleware/hashPassword');

router.post('/signup', hashPassword, userController.signUp);
router.post('/login', userController.login);

module.exports = router;
