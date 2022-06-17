const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.category_list = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) return next(err);

    res.render('category_list', { title: 'All Categories', categories });
  });
};

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category: callback => Category.findById(req.params.id).exec(callback),
      category_items: callback =>
        Item.find({ category: req.params.id }).exec(callback),
    },
    (err, { category, category_items }) => {
      if (err) return next(err);

      res.render('category_detail', {
        title: `Category Detail: ${category.name}`,
        category,
        category_items,
      });
    }
  );
};

exports.category_create_get = (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
};

exports.category_create_post = [
  body('name', 'Name is required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .escape(),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description is required.'),
  (req, res, next) => {
    Category.find().exec((err, category_names) => {
      if (err) return next(err);

      const errors = validationResult(req);

      const { name, description } = req.body;

      let category = new Category({
        name,
        description,
      });

      if (
        category_names
          .map(category => category.name.toLowerCase())
          .indexOf(category.name.toLowerCase()) > -1
      ) {
        errors.errors.push({ msg: 'Category name already in use' });
      }

      if (!errors.isEmpty()) {
        res.render('category_form', {
          title: 'Create Category',
          category,
          errors: errors.array(),
        });
      } else {
        category.save(err => {
          if (err) return next(err);

          res.redirect(category.url);
        });
      }
    });
  },
];
