const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    studentEmail: {
      type: String,
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Net Banking"],
      required: true
    },

    paymentStatus: {
      type: String,
      default: "Success"
    },

    transactionId: {
      type: String,
      required: true
    },

    paidAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);