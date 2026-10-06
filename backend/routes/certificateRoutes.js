const express = require("express");
const Certificate = require("../models/Certificate");

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const certificates = await Certificate.find({
      studentEmail: req.params.email
    }).populate("course");

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;