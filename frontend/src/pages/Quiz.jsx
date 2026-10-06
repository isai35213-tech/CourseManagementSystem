import React, { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";

import "./Learning.css";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, quiz } =
    location.state || {};

  const user = JSON.parse(
    localStorage.getItem("courseUser")
  );

  const [answers, setAnswers] =
    useState({});

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  if (!course || !quiz) {
    return (
      <div className="learning-empty">
        <h2>Quiz information not found</h2>

        <button
          onClick={() =>
            navigate("/student")
          }
        >
          Back
        </button>
      </div>
    );
  }

  const selectAnswer = (
    questionIndex,
    answer
  ) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const submitQuiz = async () => {
    if (
      Object.keys(answers).length !==
      quiz.questions.length
    ) {
      alert(
        "Please answer all questions before submitting."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/quizzes/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            studentEmail: user.email,
            studentName: user.name,
            courseId: course._id,
            quizId: quiz._id,
            answers
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Quiz submission failed"
        );

        setLoading(false);
        return;
      }

      setResult(data);
    } catch (error) {
      alert(
        "Cannot connect to backend"
      );
    }

    setLoading(false);
  };

  if (result) {
    return (
      <div className="quiz-result-page">

        <div className="quiz-result-card">

          <div className="result-icon">
            {result.passed
              ? "🏆"
              : "📚"}
          </div>

          <span>
            QUIZ RESULT
          </span>

          <h1>
            {result.passed
              ? "Congratulations!"
              : "Keep Learning!"}
          </h1>

          <p>
            {result.message}
          </p>

          <div className="score-circle">
            <strong>
              {result.percentage}%
            </strong>

            <small>
              Score
            </small>
          </div>

          <h3>
            {result.score} /{" "}
            {result.totalQuestions} correct
          </h3>

          {result.passed ? (
            <>
              <div className="passed-box">
                🎉 You passed the course
                quiz!
                <br />
                Your certificate has been
                generated.
              </div>

              <button
                className="result-button"
                onClick={() =>
                  navigate(
                    `/course/${course._id}`,
                    {
                      state: { course }
                    }
                  )
                }
              >
                Continue to Course
              </button>
            </>
          ) : (
            <>
              <div className="failed-box">
                You need at least{" "}
                {quiz.passMark}% to pass.
              </div>

              <button
                className="result-button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>
            </>
          )}

        </div>

      </div>
    );
  }

  return (
    <div className="quiz-page">

      <div className="learning-topbar">

        <div className="learning-logo">
          🎓 LearnHub
        </div>

        <button
          className="back-btn"
          onClick={() =>
            navigate(
              `/course/${course._id}`,
              {
                state: { course }
              }
            )
          }
        >
          ← Course
        </button>

      </div>

      <div className="quiz-container">

        <div className="quiz-header">

          <span>
            COURSE QUIZ
          </span>

          <h1>
            {quiz.title}
          </h1>

          <p>
            Answer all questions and submit
            your quiz.
          </p>

          <div className="quiz-info">
            <div>
              📝{" "}
              {quiz.questions.length} Questions
            </div>

            <div>
              🎯 Pass: {quiz.passMark}%
            </div>
          </div>

        </div>

        <div className="questions">

          {quiz.questions.map(
            (question, index) => (
              <div
                className="question-card"
                key={question._id}
              >

                <div className="question-number">
                  {index + 1}
                </div>

                <h2>
                  {question.question}
                </h2>

                <div className="options">

                  {question.options.map(
                    (option) => (
                      <button
                        key={option}
                        className={
                          answers[index] ===
                          option
                            ? "option selected"
                            : "option"
                        }
                        onClick={() =>
                          selectAnswer(
                            index,
                            option
                          )
                        }
                      >
                        <span>
                          {answers[index] ===
                          option
                            ? "✓"
                            : "○"}
                        </span>

                        {option}
                      </button>
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
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Quiz →"}
        </button>

      </div>

    </div>
  );
}

export default Quiz;