const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage });

const itemController = require('../controllers/itemConroller');
const categoryController = require('../controllers/categoryController');

router.get('/', itemController.index);

//items routes
router.get('/items', itemController.item_list);

router.get('/item/create', itemController.item_create_get);

router.post(
  '/item/create',
  upload.single('image'),
  itemController.item_create_post
);

router.get('/item/:id/delete', itemController.item_delete_get);

router.post('/item/:id/delete', itemController.item_delete_post);

router.get('/item/:id/update', itemController.item_update_get);

router.post(
  '/item/:id/update',
  upload.single('image'),
  itemController.item_update_post
);

router.get('/item/:id', itemController.item_detail);

//category routes
router.get('/categories', categoryController.category_list);

router.get('/category/create', categoryController.category_create_get);

router.post('/category/create', categoryController.category_create_post);

router.get('/category/:id/delete', categoryController.category_delete_get);

router.post('/category/:id/delete', categoryController.category_delete_post);

router.get('/category/:id/update', categoryController.category_update_get);

router.post('/category/:id/update', categoryController.category_update_post);

router.get('/category/:id', categoryController.category_detail);

module.exports = router;
