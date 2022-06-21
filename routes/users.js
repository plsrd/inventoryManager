const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/login', userController.user_form_get);

router.post('/login', userController.user_form_post);

module.exports = router;
