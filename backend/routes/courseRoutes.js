const express = require("express");
const Course = require("../models/Course");

const router = express.Router();


// CREATE COURSE
router.post("/", async (req, res) => {

  try {

    const course = new Course(req.body);

    const savedCourse = await course.save();

    res.status(201).json(savedCourse);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL COURSES
router.get("/", async (req, res) => {

  try {

    const courses = await Course.find();

    res.status(200).json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ONE COURSE
router.get("/:id", async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    res.status(200).json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE COURSE
router.put("/:id", async (req, res) => {

  try {

    const updatedCourse =
      await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!updatedCourse) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    res.status(200).json(updatedCourse);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE COURSE
router.delete("/:id", async (req, res) => {

  try {

    const deletedCourse =
      await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    res.status(200).json({
      message: "Course deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// VERY IMPORTANT
module.exports = router;