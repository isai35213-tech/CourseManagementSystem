const express = require("express");
const Payment = require("../models/Payment");
const Course = require("../models/Course");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      studentEmail,
      courseId,
      amount,
      paymentMethod
    } = req.body;

    if (
      !studentEmail ||
      !courseId ||
      !amount ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "All payment details are required"
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const transactionId =
      "TXN" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    const payment = new Payment({
      studentEmail,
      course: courseId,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: "Success"
    });

    const savedPayment = await payment.save();

    res.status(201).json({
      message: "Payment successful",
      payment: savedPayment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const payments = await Payment.find({
      studentEmail: req.params.email
    }).populate("course");

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;