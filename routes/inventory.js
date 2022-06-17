const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemConroller');
const categoryController = require('../controllers/categoryController');

router.get('/', itemController.index);

//items routes
router.get('/items', itemController.item_list);

router.get('/item/create', itemController.item_create_get);

router.post('/item/create', itemController.item_create_post);

router.get('/item/:id/delete', itemController.item_delete_get);

router.post('/item/:id/delete', itemController.item_delete_post);

router.get('/item/:id', itemController.item_detail);

//category routes
router.get('/categories', categoryController.category_list);

router.get('/category/create', categoryController.category_create_get);

router.post('/category/create', categoryController.category_create_post);

router.get('/category/:id/delete', categoryController.category_delete_get);

router.post('/category/:id/delete', categoryController.category_delete_post);

router.get('/category/:id', categoryController.category_detail);

module.exports = router;
