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
