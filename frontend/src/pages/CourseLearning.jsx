import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseLearning.css";

const quizData = {
  artificialintelligence: [
    {
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automated Internet",
        "Advanced Information",
        "Artificial Internet"
      ],
      answer: "Artificial Intelligence"
    },
    {
      question: "Which of the following is an application of AI?",
      options: [
        "Voice assistants",
        "Keyboard",
        "Monitor",
        "Mouse"
      ],
      answer: "Voice assistants"
    },
    {
      question: "Which field is closely related to AI?",
      options: [
        "Machine Learning",
        "Typing",
        "Printing",
        "File Management"
      ],
      answer: "Machine Learning"
    },
    {
      question: "Which technology allows computers to learn from data?",
      options: [
        "Machine Learning",
        "HTML",
        "CSS",
        "Networking"
      ],
      answer: "Machine Learning"
    },
    {
      question: "Which is an example of intelligent systems?",
      options: [
        "Recommendation system",
        "Calculator only",
        "Keyboard",
        "USB cable"
      ],
      answer: "Recommendation system"
    }
  ],

  python: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def"
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/*", "--"],
      answer: "#"
    },
    {
      question: "Which data type stores text in Python?",
      options: ["int", "float", "str", "bool"],
      answer: "str"
    },
    {
      question: "Which function is used to display output in Python?",
      options: ["display()", "show()", "print()", "output()"],
      answer: "print()"
    },
    {
      question: "Which collection is ordered and changeable?",
      options: ["Tuple", "List", "Set", "String"],
      answer: "List"
    }
  ],

  java: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "Class", "define", "create"],
      answer: "class"
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: [
        "start()",
        "main()",
        "run()",
        "execute()"
      ],
      answer: "main()"
    },
    {
      question: "Which language is Java?",
      options: [
        "Programming language",
        "Database",
        "Operating system",
        "Web browser"
      ],
      answer: "Programming language"
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["inherit", "extends", "implements", "super"],
      answer: "extends"
    },
    {
      question: "Which symbol ends most Java statements?",
      options: [".", ",", ";", ":"],
      answer: ";"
    }
  ],

  webdevelopment: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which language is used for webpage styling?",
      options: ["HTML", "CSS", "Java", "MongoDB"],
      answer: "CSS"
    },
    {
      question: "Which language is used to add interactivity to webpages?",
      options: ["JavaScript", "SQL", "CSS", "XML"],
      answer: "JavaScript"
    },
    {
      question: "Which tag is used for the largest heading?",
      options: ["<h6>", "<head>", "<h1>", "<heading>"],
      answer: "<h1>"
    },
    {
      question: "Which technology is used to store data in a MERN application?",
      options: [
        "MongoDB",
        "HTML",
        "CSS",
        "React only"
      ],
      answer: "MongoDB"
    }
  ],

  mongodb: [
    {
      question: "What type of database is MongoDB?",
      options: [
        "Relational database",
        "NoSQL database",
        "File system",
        "Operating system"
      ],
      answer: "NoSQL database"
    },
    {
      question: "MongoDB stores data mainly in what format?",
      options: [
        "Documents",
        "Rows only",
        "Tables only",
        "Cells"
      ],
      answer: "Documents"
    },
    {
      question: "What is a group of MongoDB documents called?",
      options: [
        "Collection",
        "Table",
        "Database row",
        "Sheet"
      ],
      answer: "Collection"
    },
    {
      question: "Which tool provides a graphical interface for MongoDB?",
      options: [
        "MongoDB Compass",
        "VS Code",
        "Chrome",
        "Eclipse"
      ],
      answer: "MongoDB Compass"
    },
    {
      question: "Which command is commonly used to insert one document?",
      options: [
        "insertOne()",
        "addOne()",
        "createRow()",
        "insertRow()"
      ],
      answer: "insertOne()"
    }
  ]
};

const defaultQuiz = [
  {
    question: "What is the main purpose of this course?",
    options: [
      "Learning technical concepts",
      "Playing games",
      "Watching movies",
      "Browsing websites"
    ],
    answer: "Learning technical concepts"
  },
  {
    question: "Which activity helps improve practical knowledge?",
    options: [
      "Practice",
      "Ignoring examples",
      "Skipping lessons",
      "Avoiding exercises"
    ],
    answer: "Practice"
  },
  {
    question: "What should you do before attempting the quiz?",
    options: [
      "Study the course content",
      "Close the course",
      "Skip all topics",
      "Logout"
    ],
    answer: "Study the course content"
  },
  {
    question: "Why are assessments used in a course?",
    options: [
      "To check learning",
      "To delete data",
      "To change passwords",
      "To install software"
    ],
    answer: "To check learning"
  },
  {
    question: "What can a student earn after successfully completing the course?",
    options: [
      "Certificate",
      "Password",
      "Computer",
      "Database"
    ],
    answer: "Certificate"
  }
];

function getQuizForCourse(course) {
  if (!course) {
    return defaultQuiz;
  }

  const text =
    `${course.courseName || ""} ${course.category || ""} ${course.courseCode || ""}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  if (
    text.includes("artificialintelligence") ||
    text.includes("ai")
  ) {
    return quizData.artificialintelligence;
  }

  if (text.includes("python")) {
    return quizData.python;
  }

  if (text.includes("java")) {
    return quizData.java;
  }

  if (
    text.includes("webdevelopment") ||
    text.includes("webtechnology") ||
    text.includes("html") ||
    text.includes("javascript") ||
    text.includes("react")
  ) {
    return quizData.webdevelopment;
  }

  if (
    text.includes("mongodb") ||
    text.includes("mongo")
  ) {
    return quizData.mongodb;
  }

  return defaultQuiz;
}

function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("courseUser"));

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeTab, setActiveTab] = useState("content");

  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
      return;
    }

    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);

      const courseResponse = await fetch(
        `http://localhost:5000/api/courses/${courseId}`
      );

      const courseData = await courseResponse.json();

      if (!courseResponse.ok) {
        setLoading(false);
        return;
      }

      setCourse(courseData);

      const enrollmentResponse = await fetch(
        `http://localhost:5000/api/enrollments/${user.email}`
      );

      const enrollmentData = await enrollmentResponse.json();

      if (enrollmentResponse.ok) {
        const currentEnrollment = enrollmentData.find(
          (item) =>
            item.course &&
            String(item.course._id) === String(courseId)
        );

        setEnrollment(currentEnrollment || null);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const quizQuestions = getQuizForCourse(course);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const submitQuiz = async () => {
    let correct = 0;

    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });

    const finalScore = Math.round(
      (correct / quizQuestions.length) * 100
    );

    setScore(finalScore);
    setQuizSubmitted(true);

    if (finalScore >= 60 && enrollment) {
      try {
        setCompleting(true);

        const response = await fetch(
          `http://localhost:5000/api/enrollments/${enrollment._id}/complete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              score: finalScore
            })
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEnrollment({
            ...enrollment,
            completed: true,
            quizScore: finalScore,
            certificateId: data.certificateId,
            completedAt: new Date()
          });
        }
      } catch (error) {
        console.log(error);
      }

      setCompleting(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const openCertificate = () => {
    setActiveTab("certificate");
  };

  const studentName =
    user?.name?.trim() || "Student";

  const certificateId =
    enrollment?.certificateId ||
    `CERT-${Date.now()}`;

  const printCertificate = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="learning-loading">
        <div className="loading-spinner"></div>
        <h3>Loading your course...</h3>
        <p>Please wait a moment.</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-error">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Course Not Found</h2>
          <p>
            We could not find the selected course.
          </p>

          <button
            onClick={() => navigate("/student")}
            className="primary-btn"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-learning-page">

      {/* ================= HEADER ================= */}

      <header className="learning-header">

        <button
          className="dashboard-btn"
          onClick={() => navigate("/student")}
        >
          ← Dashboard
        </button>

        <div className="learning-logo">
          <span className="logo-icon">🎓</span>
          <span>LearnHub</span>
        </div>

        <div className="student-profile">
          <span className="profile-icon">👤</span>
          <span>{studentName}</span>
        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="course-hero">

        <div className="hero-inner">

          <div className="course-category">
            {course.category}
          </div>

          <h1>{course.courseName}</h1>

          <p className="course-description">
            {course.description}
          </p>

          <div className="course-info">

            <div className="info-item">
              <span className="info-icon">👨‍🏫</span>

              <div>
                <small>Instructor</small>
                <strong>{course.teacher}</strong>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">⏱️</span>

              <div>
                <small>Duration</small>
                <strong>{course.duration}</strong>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📚</span>

              <div>
                <small>Course Code</small>
                <strong>{course.courseCode}</strong>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TABS ================= */}

      <nav className="learning-tabs">

        <button
          className={
            activeTab === "content"
              ? "learning-tab active"
              : "learning-tab"
          }
          onClick={() => setActiveTab("content")}
        >
          📖 Course Content
        </button>

        <button
          className={
            activeTab === "materials"
              ? "learning-tab active"
              : "learning-tab"
          }
          onClick={() => setActiveTab("materials")}
        >
          📚 Study Materials
        </button>

        <button
          className={
            activeTab === "quiz"
              ? "learning-tab active"
              : "learning-tab"
          }
          onClick={() => setActiveTab("quiz")}
        >
          📝 Quiz
        </button>

        {enrollment?.completed && (
          <button
            className={
              activeTab === "certificate"
                ? "learning-tab active"
                : "learning-tab"
            }
            onClick={() => setActiveTab("certificate")}
          >
            🏆 Certificate
          </button>
        )}

      </nav>

      {/* ================= MAIN CONTENT ================= */}

      <main className="learning-main">

        {/* ================= COURSE CONTENT ================= */}

        {activeTab === "content" && (
          <section>

            <div className="content-heading">
              <div className="heading-icon">🎓</div>

              <div>
                <h2>{course.courseName}</h2>

                <p>
                  Welcome to your learning journey.
                  Study the course topics carefully and
                  complete the quiz to earn your certificate.
                </p>
              </div>
            </div>

            <div className="topic-grid">

              <div className="topic-card">
                <div className="topic-icon blue">
                  📘
                </div>

                <div>
                  <h3>Introduction</h3>

                  <p>
                    Understand the basic concepts of{" "}
                    {course.courseName}.
                  </p>
                </div>
              </div>

              <div className="topic-card">
                <div className="topic-icon purple">
                  💡
                </div>

                <div>
                  <h3>Core Concepts</h3>

                  <p>
                    Learn the important concepts and
                    fundamentals of the course.
                  </p>
                </div>
              </div>

              <div className="topic-card">
                <div className="topic-icon blue">
                  🛠️
                </div>

                <div>
                  <h3>Practical Learning</h3>

                  <p>
                    Apply the concepts through practical
                    examples and activities.
                  </p>
                </div>
              </div>

              <div className="topic-card">
                <div className="topic-icon purple">
                  🎯
                </div>

                <div>
                  <h3>Assessment</h3>

                  <p>
                    Complete the {quizQuestions.length}-question
                    quiz after studying the course.
                  </p>
                </div>
              </div>

            </div>

            <div className="start-learning-box">

              <div>
                <h3>Ready to test your knowledge?</h3>

                <p>
                  Complete the course quiz and score at
                  least 60% to earn your certificate.
                </p>
              </div>

              <button
                className="start-study-btn"
                onClick={() => setActiveTab("quiz")}
              >
                Start Quiz →
              </button>

            </div>

          </section>
        )}

        {/* ================= STUDY MATERIALS ================= */}

        {activeTab === "materials" && (
          <section>

            <div className="section-title">
              <span>📚</span>

              <div>
                <h2>Study Materials</h2>

                <p>
                  Review these materials before attempting
                  the quiz.
                </p>
              </div>
            </div>

            <div className="materials-grid">

              <div className="material-card">
                <div className="material-icon">
                  📖
                </div>

                <h3>Course Introduction</h3>

                <p>
                  Learn the basic concepts and introduction
                  to {course.courseName}.
                </p>

                <button className="material-btn">
                  View Material
                </button>
              </div>

              <div className="material-card">
                <div className="material-icon">
                  💡
                </div>

                <h3>Core Concepts</h3>

                <p>
                  Understand the important concepts and
                  fundamentals.
                </p>

                <button className="material-btn">
                  View Material
                </button>
              </div>

              <div className="material-card">
                <div className="material-icon">
                  🛠️
                </div>

                <h3>Practical Examples</h3>

                <p>
                  Improve your understanding using practical
                  examples.
                </p>

                <button className="material-btn">
                  View Material
                </button>
              </div>

              <div className="material-card">
                <div className="material-icon">
                  📝
                </div>

                <h3>Quiz Preparation</h3>

                <p>
                  Review the topics before starting your
                  course-specific quiz.
                </p>

                <button
                  className="material-btn"
                  onClick={() => setActiveTab("quiz")}
                >
                  Take Quiz
                </button>
              </div>

            </div>

          </section>
        )}

        {/* ================= QUIZ ================= */}

        {activeTab === "quiz" && (
          <section className="quiz-section">

            <div className="quiz-header">

              <div className="quiz-title-icon">
                📝
              </div>

              <div>
                <h2>{course.courseName} Quiz</h2>

                <p>
                  Answer all {quizQuestions.length} questions.
                  You need 60% or above to pass.
                </p>
              </div>

            </div>

            {!quizSubmitted ? (
              <>
                <div className="quiz-progress">
                  <span>
                    {Object.keys(answers).length} /{" "}
                    {quizQuestions.length} answered
                  </span>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          (Object.keys(answers).length /
                            quizQuestions.length) *
                          100
                        }%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="questions-container">

                  {quizQuestions.map(
                    (question, index) => (
                      <div
                        className="question-card"
                        key={index}
                      >

                        <div className="question-number">
                          Question {index + 1}
                        </div>

                        <h3>
                          {question.question}
                        </h3>

                        <div className="options-list">

                          {question.options.map(
                            (option, optionIndex) => (
                              <label
                                key={optionIndex}
                                className={
                                  answers[index] === option
                                    ? "quiz-option selected"
                                    : "quiz-option"
                                }
                              >

                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={option}
                                  checked={
                                    answers[index] ===
                                    option
                                  }
                                  onChange={() =>
                                    handleAnswer(
                                      index,
                                      option
                                    )
                                  }
                                />

                                <span>
                                  {option}
                                </span>

                              </label>
                            )
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

                <button
                  className="submit-quiz-btn"
                  onClick={submitQuiz}
                  disabled={
                    Object.keys(answers).length !==
                    quizQuestions.length
                  }
                >
                  Submit Quiz →
                </button>
              </>
            ) : (
              <div className="quiz-result">

                <div
                  className={
                    score >= 60
                      ? "result-icon success"
                      : "result-icon failed"
                  }
                >
                  {score >= 60 ? "🎉" : "😔"}
                </div>

                <h2>
                  {score >= 60
                    ? "Quiz Passed!"
                    : "Quiz Not Passed"}
                </h2>

                <div className="score-circle">
                  <strong>{score}%</strong>
                  <span>Your Score</span>
                </div>

                <p>
                  {score >= 60
                    ? "Congratulations! You have successfully completed the quiz."
                    : "You need at least 60% to pass. Review the course and try again."}
                </p>

                <div className="result-buttons">

                  {score >= 60 ? (
                    <>
                      <button
                        className="certificate-btn"
                        onClick={openCertificate}
                        disabled={completing}
                      >
                        🏆 View Certificate
                      </button>

                      <button
                        className="secondary-btn"
                        onClick={() =>
                          navigate("/student")
                        }
                      >
                        ← Dashboard
                      </button>
                    </>
                  ) : (
                    <button
                      className="certificate-btn"
                      onClick={resetQuiz}
                    >
                      🔄 Try Again
                    </button>
                  )}

                </div>

              </div>
            )}

          </section>
        )}

        {/* ================= CERTIFICATE ================= */}

        {activeTab === "certificate" &&
          enrollment?.completed && (
            <section className="certificate-section">

              <div className="certificate-actions">
                <button
                  className="secondary-btn"
                  onClick={() => setActiveTab("quiz")}
                >
                  ← Back
                </button>

                <button
                  className="print-btn"
                  onClick={printCertificate}
                >
                  🖨️ Print Certificate
                </button>
              </div>

              <div className="certificate">

                <div className="certificate-logo">
                  🎓
                </div>

                <p className="certificate-small">
                  LEARNHUB
                </p>

                <h1>Certificate of Completion</h1>

                <div className="certificate-line"></div>

                <p className="certificate-text">
                  This certificate is proudly presented to
                </p>

                <h2 className="student-name">
                  {studentName}
                </h2>

                <p className="certificate-text">
                  for successfully completing the course
                </p>

                <h3 className="certificate-course">
                  {course.courseName}
                </h3>

                <p className="certificate-description">
                  The student has successfully completed
                  the course assessment with a score of{" "}
                  <strong>
                    {enrollment.quizScore || score}%
                  </strong>.
                </p>

                <div className="certificate-details">

                  <div>
                    <span>Course Code</span>
                    <strong>
                      {course.courseCode}
                    </strong>
                  </div>

                  <div>
                    <span>Score</span>
                    <strong>
                      {enrollment.quizScore || score}%
                    </strong>
                  </div>

                  <div>
                    <span>Certificate ID</span>
                    <strong>
                      {certificateId}
                    </strong>
                  </div>

                </div>

                <div className="certificate-footer">

                  <div>
                    <div className="signature">
                      LearnHub
                    </div>

                    <span>
                      LearnHub Academy
                    </span>
                  </div>

                  <div>
                    <div className="certificate-date">
                      {enrollment.completedAt
                        ? new Date(
                            enrollment.completedAt
                          ).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </div>

                    <span>
                      Date of Completion
                    </span>
                  </div>

                </div>

              </div>

            </section>
          )}

      </main>

    </div>
  );
}

export default CourseLearning;