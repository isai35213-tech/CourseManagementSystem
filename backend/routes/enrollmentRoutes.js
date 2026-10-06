const express = require("express");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const router = express.Router();

/* =========================
   CREATE ENROLLMENT + PAYMENT
========================= */

router.post("/", async (req, res) => {
  try {
    const {
      studentEmail,
      courseId,
      paymentMethod,
      amount
    } = req.body;

    if (!studentEmail || !courseId) {
      return res.status(400).json({
        message: "Student email and course ID are required"
      });
    }

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // Check already enrolled
    const existingEnrollment = await Enrollment.findOne({
      studentEmail: studentEmail,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "You are already enrolled in this course"
      });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      studentEmail: studentEmail,
      course: courseId,

      paymentStatus: "Paid",

      paymentMethod:
        paymentMethod || "Online Payment",

      amount:
        amount !== undefined
          ? amount
          : course.price
    });

    const savedEnrollment =
      await enrollment.save();

    res.status(201).json({
      message: "Payment successful and course enrolled",
      enrollment: savedEnrollment
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});


/* =========================
   GET STUDENT ENROLLMENTS
========================= */

router.get("/:email", async (req, res) => {
  try {

    const enrollments =
      await Enrollment.find({
        studentEmail: req.params.email
      }).populate("course");

    res.status(200).json(enrollments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


/* =========================
   COMPLETE QUIZ
   + CERTIFICATE
========================= */

router.post("/:id/complete", async (req, res) => {
  try {

    const { score } = req.body;

    const enrollment =
      await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    // Certificate allowed only if score >= 60
    if (score < 60) {
      return res.status(400).json({
        message:
          "You must score at least 60% to get the certificate"
      });
    }

    // Generate certificate ID
    const certificateId =
      "CERT-" +
      Date.now();

    enrollment.quizScore = score;
    enrollment.completed = true;
    enrollment.certificateId = certificateId;
    enrollment.completedAt = new Date();

    await enrollment.save();

    res.status(200).json({
      message:
        "Course completed successfully",
      enrollment: enrollment
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
});


/* =========================
   REMOVE ENROLLMENT
========================= */

router.delete("/:id", async (req, res) => {
  try {

    const deletedEnrollment =
      await Enrollment.findByIdAndDelete(
        req.params.id
      );

    if (!deletedEnrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      message:
        "Enrollment removed successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


module.exports = router;