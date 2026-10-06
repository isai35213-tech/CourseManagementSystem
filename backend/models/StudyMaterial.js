const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    materialType: {
      type: String,
      enum: ["PDF", "Video", "Link", "Notes"],
      required: true
    },

    materialUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudyMaterial",
  studyMaterialSchema
);