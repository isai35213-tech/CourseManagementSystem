const express = require("express");
const StudyMaterial = require("../models/StudyMaterial");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const material = new StudyMaterial(req.body);

    const savedMaterial = await material.save();

    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/course/:courseId", async (req, res) => {
  try {
    const materials = await StudyMaterial.find({
      course: req.params.courseId
    });

    res.json(materials);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await StudyMaterial.findByIdAndDelete(req.params.id);

    res.json({
      message: "Study material deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;