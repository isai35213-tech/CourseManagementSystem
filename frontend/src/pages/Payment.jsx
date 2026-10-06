import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("courseUser"));

  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
      return;
    }

    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError("Course not found");
        setLoading(false);
        return;
      }

      setCourse(data);
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }

    setLoading(false);
  };

  const handlePayment = async () => {
    setError("");

    if (!course) return;

    setProcessing(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/enrollments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            studentEmail: user.email,
            courseId: course._id,
            paymentMethod: paymentMethod,
            amount: course.price
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Payment failed");
        setProcessing(false);
        return;
      }

      // Show payment completed screen
      setPaymentCompleted(true);
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }

    setProcessing(false);
  };

  const goBack = () => {
    navigate("/student");
  };

  const continueToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="payment-loading">
        <div className="payment-loader">⏳</div>
        <h3>Loading payment page...</h3>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="payment-error-page">
        <div className="payment-error-card">
          <div className="error-icon">⚠️</div>

          <h2>Course Not Found</h2>

          <p>We couldn't find this course.</p>

          <button onClick={goBack} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ================================
  // PAYMENT COMPLETED SCREEN
  // ================================
  if (paymentCompleted) {
    return (
      <div className="payment-success-page">
        <div className="payment-success-card">

          <div className="success-circle">
            ✓
          </div>

          <h1>Payment Completed!</h1>

          <p className="success-message">
            🎉 Your payment was successful and you are now enrolled in the course.
          </p>

          <div className="success-course-box">
            <span className="success-course-icon">🎓</span>

            <div>
              <small>Course</small>
              <h2>{course.courseName}</h2>
            </div>
          </div>

          <div className="success-details">

            <div className="success-detail">
              <span>💰</span>

              <div>
                <small>Amount Paid</small>

                <strong>
                  {course.price === 0
                    ? "FREE"
                    : `₹${course.price}`}
                </strong>
              </div>
            </div>

            <div className="success-detail">
              <span>💳</span>

              <div>
                <small>Payment Method</small>

                <strong>
                  {course.price === 0
                    ? "Free Enrollment"
                    : paymentMethod}
                </strong>
              </div>
            </div>

            <div className="success-detail">
              <span>📧</span>

              <div>
                <small>Student</small>

                <strong>{user.name}</strong>
              </div>
            </div>

          </div>

          <div className="enrollment-success">
            <span>✓</span>
            <div>
              <strong>Enrollment Confirmed</strong>
              <p>You can now start learning this course.</p>
            </div>
          </div>

          <div className="success-buttons">

            <button
              className="start-course-btn"
              onClick={continueToCourse}
            >
              Start Learning →
            </button>

            <button
              className="dashboard-btn"
              onClick={goBack}
            >
              Go to Dashboard
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">

      <header className="payment-header">

        <button
          className="payment-back"
          onClick={goBack}
        >
          ← Back to Courses
        </button>

        <div className="payment-brand">
          <span>🎓</span>
          LearnHub
        </div>

      </header>

      <main className="payment-container">

        <div className="payment-title">

          <span>SECURE ENROLLMENT</span>

          <h1>Complete Your Enrollment</h1>

          <p>
            Choose your payment method and start learning.
          </p>

        </div>

        <div className="payment-layout">

          {/* COURSE DETAILS */}

          <div className="payment-course-card">

            <div className="payment-course-icon">
              🎓
            </div>

            <div className="payment-course-category">
              {course.category}
            </div>

            <h2>{course.courseName}</h2>

            <p>{course.description}</p>

            <div className="payment-course-details">

              <div>
                <span>👨‍🏫</span>

                <div>
                  <small>Instructor</small>
                  <strong>{course.teacher}</strong>
                </div>
              </div>

              <div>
                <span>⏱️</span>

                <div>
                  <small>Duration</small>
                  <strong>{course.duration}</strong>
                </div>
              </div>

              <div>
                <span>📚</span>

                <div>
                  <small>Course Code</small>
                  <strong>{course.courseCode}</strong>
                </div>
              </div>

            </div>

          </div>

          {/* PAYMENT DETAILS */}

          <div className="payment-card">

            <div className="payment-card-header">

              <h2>Payment Details</h2>

              <span>🔒 Secure</span>

            </div>

            <div className="payment-price">

              <span>Course Fee</span>

              <strong>
                {course.price === 0
                  ? "FREE"
                  : `₹${course.price}`}
              </strong>

            </div>

            {/* PAYMENT METHODS */}

            {course.price > 0 && (
              <div className="payment-method-section">

                <h3>Select Payment Method</h3>

                <div className="payment-methods">

                  {/* UPI */}

                  <button
                    type="button"
                    className={
                      paymentMethod === "UPI"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("UPI")
                    }
                  >

                    <span className="method-icon">
                      📱
                    </span>

                    <div>
                      <strong>UPI</strong>
                      <small>
                        Google Pay / PhonePe
                      </small>
                    </div>

                    <span className="radio">
                      {paymentMethod === "UPI"
                        ? "●"
                        : "○"}
                    </span>

                  </button>

                  {/* CARD */}

                  <button
                    type="button"
                    className={
                      paymentMethod === "Card"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("Card")
                    }
                  >

                    <span className="method-icon">
                      💳
                    </span>

                    <div>
                      <strong>
                        Debit / Credit Card
                      </strong>

                      <small>
                        Visa / Mastercard
                      </small>
                    </div>

                    <span className="radio">
                      {paymentMethod === "Card"
                        ? "●"
                        : "○"}
                    </span>

                  </button>

                  {/* NET BANKING */}

                  <button
                    type="button"
                    className={
                      paymentMethod === "Net Banking"
                        ? "payment-method active"
                        : "payment-method"
                    }
                    onClick={() =>
                      setPaymentMethod("Net Banking")
                    }
                  >

                    <span className="method-icon">
                      🏦
                    </span>

                    <div>
                      <strong>
                        Net Banking
                      </strong>

                      <small>
                        All major banks
                      </small>
                    </div>

                    <span className="radio">
                      {paymentMethod === "Net Banking"
                        ? "●"
                        : "○"}
                    </span>

                  </button>

                </div>

              </div>
            )}

            {/* FREE COURSE */}

            {course.price === 0 && (
              <div className="free-course-box">

                <span>🎉</span>

                <div>
                  <strong>
                    This course is free!
                  </strong>

                  <p>
                    No payment is required.
                  </p>
                </div>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="payment-error">
                ⚠️ {error}
              </div>
            )}

            {/* TOTAL */}

            <div className="payment-total">

              <span>Total Amount</span>

              <strong>
                {course.price === 0
                  ? "₹0"
                  : `₹${course.price}`}
              </strong>

            </div>

            {/* PAY BUTTON */}

            <button
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={processing}
            >

              {processing
                ? "Processing Payment..."
                : course.price === 0
                ? "Enroll for Free →"
                : `Pay ₹${course.price} & Enroll →`}

            </button>

            <p className="payment-note">
              🔒 This is a secure demo payment for the
              Course Management System.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Payment;