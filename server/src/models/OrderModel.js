import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  total_price: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  }
},
  {
    timestamps: true
  }
);

export default mongoose.model('Order', OrderSchema);