import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  countInStock: {
    type: Number,
    required: true,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [
    ItemSchema
  ]
},
  {
    timestamps: true
  }
);

export default mongoose.model('Cart', CartSchema);
