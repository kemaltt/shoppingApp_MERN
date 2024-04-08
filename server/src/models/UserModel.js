import mongoose from "mongoose";


const User = new mongoose.Schema({
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String
  },
  favorite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
},
  {
    timestamps: true
  });

export default mongoose.model('User', User);

