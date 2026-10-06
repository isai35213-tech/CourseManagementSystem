const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true
    },

    courseCode: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    teacher: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);