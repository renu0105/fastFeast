import mongoose from "mongoose";
const ProductSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },

  createdAt: { type: Date, default: Date.now },
  purchaseCount: { type: Number, default: 0 }, // Tracks the number of purchases
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSChema);
