const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');

exports.index = (req, res, next) => {
  async.parallel(
    {
      totalItems: callback => Item.countDocuments({}, callback),
      totalCategories: callback => Category.countDocuments({}, callback),
    },
    (err, { totalItems, totalCategories }) => {
      if (err) return next(err);

      res.render('index', {
        title: 'Inventory Manager',
        totalCategories,
        totalItems,
      });
    }
  );
};

exports.item_list = (req, res, next) => {
  Item.find({})
    .populate('category')
    .exec((err, item_list) => {
      if (err) return next(err);

      res.render('item_list', { title: 'All items', item_list });
    });
};

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('category')
    .exec((err, item) => {
      if (err) return next(err);

      res.render('item_detail', { title: `Item Detail: ${item.name}`, item });
    });
};
