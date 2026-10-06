const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
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

    enrolledAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Prevent the same student from enrolling in the same course twice
enrollmentSchema.index(
  {
    studentEmail: 1,
    course: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);