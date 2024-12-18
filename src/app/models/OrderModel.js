import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // product id
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    shippingAddress: {
      name: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
    },
    paymentResult: {
      type: String,
    },
    itemsPrice: {
      type: Number,
    },
    shippingPrice: {
      type: Number,
    },
    taxPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
    },
    isDelivered: {
      type: Boolean,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
