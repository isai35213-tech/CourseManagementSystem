const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },

    options: {
      type: [String],
      required: true
    },

    correctAnswer: {
      type: String,
      required: true
    }
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
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

    passMark: {
      type: Number,
      default: 60
    },

    questions: {
      type: [questionSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);