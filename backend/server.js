const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(
      "MongoDB Connection Error:",
      error
    );
  });

const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const paymentRoutes = require("./routes/paymentRoutes");
const materialRoutes = require("./routes/materialRoutes");
const quizRoutes = require("./routes/quizRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

app.use("/api/courses", courseRoutes);

app.use("/api/auth", authRoutes);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/materials",
  materialRoutes
);

app.use(
  "/api/quizzes",
  quizRoutes
);

app.use(
  "/api/certificates",
  certificateRoutes
);

app.get("/", (req, res) => {
  res.send(
    "Course Management System Backend Running"
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});