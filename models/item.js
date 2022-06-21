const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  price: { type: Number, required: true },
  in_stock: { type: Number, required: true },
  image: { type: String },
});

ItemSchema.virtual('url').get(function () {
  return '/inventory/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
