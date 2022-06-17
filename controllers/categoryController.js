const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');

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
