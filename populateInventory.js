const async = require('async');
const Category = require('./models/category');
const Item = require('./models/item');
require('dotenv').config();

const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_DB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let items = [];
let categories = [];

const buildItem = (name, category, description, price, in_stock, cb) => {
  const item = new Item({
    name,
    category,
    description,
    price,
    in_stock,
  });

  item.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);

    items.push(item);
    cb(null, item);
  });
};

const buildCategory = (name, description, cb) => {
  const category = new Category({
    name,
    description,
  });

  category.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Cateogry: ', category);

    categories.push(category);

    cb(null, category);
  });
};

const createCategories = cb => {
  async.series(
    [
      callback =>
        buildCategory(
          'Every Day Carry',
          'A collection of useful items that are consistently carried every day. The main reasons for having EDC are utility and preparedness; to help individuals overcome simple everyday problems, including possible emergency situations.',
          callback
        ),
      callback =>
        buildCategory(
          'Tools',
          "Objects that can extend an individual's ability to modify features of the surrounding environment.",
          callback
        ),
      callback =>
        buildCategory(
          'Office Supplies',
          'Consumables and equipment regularly used in offices, by individuals engaged in written communications, recordkeeping or bookkeeping, janitorial and cleaning, and for storage of supplies or data',
          callback
        ),
      callback =>
        buildCategory(
          'Gadgets',
          'Small mechanical items with a practical use but often thought of as a novelty',
          callback
        ),
    ],
    cb
  );
};

const createItems = cb => {
  async.series([
    callback =>
      buildItem(
        '12mm Knurl Grip Ballpoint Pen',
        [categories[0], categories[2]],
        'A plastic pen with aggressive 12mm knurled grip. Takes Parker-style ink refills.',
        5,
        15,
        callback
      ),
    callback =>
      buildItem(
        '10mm Knurl Grip Ballpoint Pen',
        [categories[0], categories[2]],
        'A plastic pen with 10mm knurled grip. Takes Parker-style ink refills.',
        4.5,
        8,
        callback
      ),
    callback =>
      buildItem(
        'Grid Pen Holder',
        [categories[2]],
        'Grid-based desktop marker and pen holder. Holds up to 40 pens',
        12,
        3,
        callback
      ),
    callback =>
      buildItem(
        'Large Waterproof Pill Vessel',
        [categories[0]],
        '3.25" twist-top vessel. Both air and waterproof',
        7,
        9,
        callback
      ),
    callback =>
      buildItem(
        'Small Waterproof Pill Vessel',
        [categories[0]],
        '2.25" twist-top vessel. Both air and waterproof',
        6,
        11,
        callback
      ),
    callback =>
      buildItem(
        'Origami Carbiner ',
        [categories[0], categories[1]],
        'Perfectly hook on your back pack or key for your daily life.',
        5,
        10,
        callback
      ),
    callback =>
      buildItem(
        'Mini Vise',
        [categories[1]],
        'A small vise that clamps onto any tabletop',
        17,
        2,
        callback
      ),
    callback =>
      buildItem(
        'Vented Mini Funnel',
        [categories[1]],
        'Vented mini funnel for small bottles (neck diameter 12mm).',
        2,
        15,
        callback
      ),
    callback =>
      buildItem(
        'Mason Jar Candy Machine Base',
        [categories[3]],
        'Fully functional candy machine that takes a standard mason jar as a top',
        25,
        3,
        callback
      ),
  ]);
};

async.series([createCategories, createItems], (err, results) => {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log('DONE ', results);
  }

  mongoose.connection.close();
});
