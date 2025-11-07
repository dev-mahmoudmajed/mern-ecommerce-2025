import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a name'],
    minLength: 2,
  },
  description: {
    type: String,
    required: [true, 'Please provide a Description'],
  },
  img: {
    type: String,
    required: [true, 'Please provide a img'],
  },
  categories: {
    type: Array,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a img'],
  },
})

const Product = mongoose.model('Product', productSchema);

export default Product;