const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemConroller');

router.get('/', itemController.index);

module.exports = router;
