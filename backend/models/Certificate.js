const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    studentEmail: {
      type: String,
      required: true
    },

    studentName: {
      type: String,
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    certificateId: {
      type: String,
      required: true,
      unique: true
    },

    issuedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);