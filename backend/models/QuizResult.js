const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
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

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },

    score: {
      type: Number,
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    percentage: {
      type: Number,
      required: true
    },

    passed: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "QuizResult",
  quizResultSchema
);