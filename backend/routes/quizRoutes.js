const express = require("express");
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const Certificate = require("../models/Certificate");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);

    const savedQuiz = await quiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/course/:courseId", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      course: req.params.courseId
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const {
      studentEmail,
      studentName,
      courseId,
      quizId,
      answers
    } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const totalQuestions = quiz.questions.length;

    const percentage =
      totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

    const passed = percentage >= quiz.passMark;

    const result = new QuizResult({
      studentEmail,
      course: courseId,
      quiz: quizId,
      score,
      totalQuestions,
      percentage,
      passed
    });

    await result.save();

    let certificate = null;

    if (passed) {
      const existingCertificate =
        await Certificate.findOne({
          studentEmail,
          course: courseId
        });

      if (existingCertificate) {
        certificate = existingCertificate;
      } else {
        certificate = new Certificate({
          studentEmail,
          studentName,
          course: courseId,
          certificateId:
            "CERT-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 10000)
        });

        await certificate.save();
      }
    }

    res.json({
      message: passed
        ? "Congratulations! You passed the quiz."
        : "Quiz completed. Try again to pass.",
      score,
      totalQuestions,
      percentage,
      passed,
      certificate
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;