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
  ratings: [{ type: Number, min: 1, max: 5 }],
  averageRating: { type: Number, min: 1, max: 5, default: 0 },

  createdAt: { type: Date, default: Date.now },
  purchaseCount: { type: Number, default: 0 }, // Tracks the number of purchases
});

ProductSChema.methods.updateRating = function () {
  if (ratings.length > 0) {
    averageRating =
      ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  } else {
    averageRating = 0;
  }
  return averageRating;
};

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSChema);
