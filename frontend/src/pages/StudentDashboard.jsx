import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "../Dashboard.css";


function StudentDashboard() {

  const navigate = useNavigate();


  /* =========================
     USER
  ========================= */

  const user = JSON.parse(
    localStorage.getItem("courseUser")
  );


  /* =========================
     STATES
  ========================= */

  const [courses, setCourses] =
    useState([]);

  const [enrollments, setEnrollments] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {

    if (
      !user ||
      user.role !== "student"
    ) {

      navigate("/login");

      return;
    }

    loadData();

  }, []);


  /* =========================
     GET COURSES + ENROLLMENTS
  ========================= */

  const loadData = async () => {

    try {

      /* GET COURSES */

      const courseResponse =
        await fetch(
          "http://localhost:5000/api/courses"
        );

      const courseData =
        await courseResponse.json();

      setCourses(courseData);


      /* GET STUDENT ENROLLMENTS */

      const enrollmentResponse =
        await fetch(
          `http://localhost:5000/api/enrollments/${user.email}`
        );

      const enrollmentData =
        await enrollmentResponse.json();

      setEnrollments(
        enrollmentData
      );

    } catch (error) {

      console.log(error);

    }

    setLoading(false);
  };


  /* =========================
     ENROLL COURSE
     
     IMPORTANT:
     Now payment page opens
  ========================= */

  const enrollCourse = (
    courseId
  ) => {

    navigate(
      `/payment/${courseId}`
    );
  };


  /* =========================
     REMOVE COURSE
  ========================= */

  const removeCourse = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Remove this course?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await fetch(
          `http://localhost:5000/api/enrollments/${id}`,
          {
            method: "DELETE"
          }
        );

      const data =
        await response.json();


      if (!response.ok) {

        setMessage(
          data.message ||
          "Unable to remove course"
        );

        return;
      }


      setMessage(
        "Course removed successfully."
      );


      loadData();


      setTimeout(() => {

        setMessage("");

      }, 3000);


    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to connect to server."
      );

    }

  };


  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.removeItem(
      "courseUser"
    );

    navigate("/login");
  };


  /* =========================
     CHECK ENROLLED
  ========================= */

  const alreadyEnrolled = (
    id
  ) => {

    return enrollments.some(
      (item) =>
        item.course &&
        item.course._id === id
    );
  };


  /* =========================
     RECOMMENDED COURSES
  ========================= */

  const recommendedCourses =
    courses
      .filter(
        (course) =>
          !alreadyEnrolled(
            course._id
          )
      )
      .slice(0, 3);


  /* =========================
     SCROLL TO COURSES
  ========================= */

  const scrollToCourses = () => {

    document
      .getElementById(
        "available-courses"
      )
      ?.scrollIntoView({
        behavior: "smooth"
      });

  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="dashboard-loading">

        <div className="loader"></div>

        <p>
          Loading your dashboard...
        </p>

      </div>

    );

  }


  /* =========================
     UI
  ========================= */

  return (

    <div className="dashboard-page">


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="dashboard-sidebar">


        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            🎓
          </div>

          <div>

            <h2>
              LearnHub
            </h2>

            <span>
              Course Management
            </span>

          </div>

        </div>


        {/* MENU */}

        <nav className="sidebar-menu">


          <button
            className="menu-item active"
          >

            <span>
              🏠
            </span>

            Dashboard

          </button>


          <button
            className="menu-item"
            onClick={
              scrollToCourses
            }
          >

            <span>
              📚
            </span>

            Browse Courses

          </button>


          <button
            className="menu-item"
            onClick={() =>
              document
                .getElementById(
                  "my-courses"
                )
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >

            <span>
              🎯
            </span>

            My Courses

          </button>


        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">


          <div className="sidebar-help">

            <div className="help-icon">
              💡
            </div>

            <div className="help-content">

              <strong>
                Keep Learning!
              </strong>

              <p>
                Explore new courses
                and improve your skills.
              </p>

            </div>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>


        </div>

      </aside>



      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="dashboard-main">


        {/* ================= HEADER ================= */}

        <header className="dashboard-header">


          <div>

            <p className="dashboard-label">
              STUDENT DASHBOARD
            </p>


            <h1>

              Welcome back,{" "}

              <span>
                {user?.name ||
                  "Student"}
              </span>

              {" "}👋

            </h1>


            <p className="header-subtitle">

              Continue your learning
              journey and discover
              something new.

            </p>

          </div>



          {/* PROFILE */}

          <div className="profile-box">

            <div className="profile-avatar">

              {(user?.name ||
                "S")
                .charAt(0)
                .toUpperCase()}

            </div>


            <div>

              <strong>

                {user?.name ||
                  "Student"}

              </strong>


              <small>
                {user?.email}
              </small>


              <small className="profile-role">
                Student
              </small>

            </div>

          </div>


        </header>



        {/* ================= MESSAGE ================= */}

        {message && (

          <div className="dashboard-message">

            {message}

          </div>

        )}



        {/* ==================================================
            STATS
        ================================================== */}

        <section className="stats-grid">


          {/* AVAILABLE */}

          <div className="stat-card">

            <div className="stat-icon purple">
              📚
            </div>

            <div>

              <span>
                Available Courses
              </span>

              <h2>
                {courses.length}
              </h2>

            </div>

          </div>



          {/* MY COURSES */}

          <div className="stat-card">

            <div className="stat-icon blue">
              🎯
            </div>

            <div>

              <span>
                My Courses
              </span>

              <h2>
                {enrollments.length}
              </h2>

            </div>

          </div>



          {/* STATUS */}

          <div className="stat-card">

            <div className="stat-icon green">
              🚀
            </div>

            <div>

              <span>
                Learning Status
              </span>

              <h2>
                Active
              </h2>

            </div>

          </div>



          {/* LEVEL */}

          <div className="stat-card">

            <div className="stat-icon orange">
              ⭐
            </div>

            <div>

              <span>
                Learning Level
              </span>

              <h2>
                Beginner
              </h2>

            </div>

          </div>


        </section>



        {/* ==================================================
            HERO
        ================================================== */}

        <section className="welcome-banner">


          <div className="welcome-text">

            <span className="banner-label">
              ✨ KEEP LEARNING
            </span>


            <h2>

              Build your skills.

              <br />

              Shape your future.

            </h2>


            <p>

              Explore our courses, learn
              from experienced teachers
              and grow your career skills.

            </p>


            <button
              className="explore-btn"
              onClick={
                scrollToCourses
              }
            >

              Explore Courses

              <b>
                →
              </b>

            </button>


          </div>



          <div className="welcome-illustration">


            <div className="illustration-circle">
              🎓
            </div>


            <div className="floating-card card-one">

              📚

              <span>
                Learn
              </span>

            </div>


            <div className="floating-card card-two">

              ⭐

              <span>
                Grow
              </span>

            </div>


            <div className="floating-card card-three">

              ✓

              <span>
                Achieve
              </span>

            </div>


          </div>


        </section>



        {/* ==================================================
            MY COURSES
        ================================================== */}

        <section
          className="dashboard-section"
          id="my-courses"
        >


          <div className="section-heading">


            <div>

              <span>
                YOUR LEARNING
              </span>

              <h2>
                My Courses
              </h2>

            </div>


            <div className="course-count">

              {enrollments.length}

              {" "}Enrolled

            </div>


          </div>



          {/* NO COURSES */}

          {enrollments.length === 0 ? (

            <div className="empty-box">


              <div className="empty-icon">
                📖
              </div>


              <h3>
                No courses yet
              </h3>


              <p>

                You haven't enrolled in
                any course yet.

              </p>


              <button
                className="browse-empty-btn"
                onClick={
                  scrollToCourses
                }
              >

                Browse Courses →

              </button>


            </div>

          ) : (


            <div className="course-grid">


              {enrollments.map(
                (item) => (

                  <div
                    className="course-card"
                    key={item._id}
                  >


                    <div className="course-top enrolled-top">

                      <span>
                        ENROLLED
                      </span>


                      <div className="course-icon">
                        🎓
                      </div>

                    </div>



                    <div className="course-body">


                      <div className="course-code">

                        {item.course?.courseCode}

                      </div>


                      <h3>

                        {item.course?.courseName}

                      </h3>


                      <p>

                        {item.course?.description}

                      </p>


                      <div className="course-info">


                        <span>

                          👨‍🏫{" "}

                          {item.course?.teacher}

                        </span>


                        <span>

                          ⏱{" "}

                          {item.course?.duration}

                        </span>


                      </div>


                      {/* PAYMENT STATUS */}

                      <div
                        style={{
                          marginTop:
                            "12px",
                          fontSize:
                            "13px",
                          fontWeight:
                            "700",
                          color:
                            item.paymentStatus ===
                            "Paid"
                              ? "#16a34a"
                              : "#f59e0b"
                        }}
                      >

                        {item.paymentStatus ===
                        "Paid"
                          ? "✓ Payment Completed"
                          : "⏳ Payment Pending"}

                      </div>


                      {/* BUTTONS */}

                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          marginTop:
                            "15px",
                          flexWrap:
                            "wrap"
                        }}
                      >


                        <button
                          className="enroll-btn"
                          onClick={() =>
                            navigate(
                              `/course/${item.course?._id}`
                            )
                          }
                        >

                          Study Now →

                        </button>


                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeCourse(
                              item._id
                            )
                          }
                        >

                          Remove Course

                        </button>


                      </div>


                    </div>

                  </div>

                )
              )}

            </div>

          )}


        </section>



        {/* ==================================================
            RECOMMENDED COURSES
        ================================================== */}

        <section className="dashboard-section">


          <div className="section-heading">


            <div>

              <span>
                RECOMMENDED FOR YOU
              </span>

              <h2>
                Recommended Courses
              </h2>

            </div>


            <button
              className="section-explore-btn"
              onClick={
                scrollToCourses
              }
            >

              Explore All →

            </button>


          </div>



          {recommendedCourses.length === 0 ? (


            <div className="recommended-empty">

              <div>
                🎉
              </div>

              <h3>
                You're all caught up!
              </h3>

              <p>

                You are already enrolled
                in all available courses.

              </p>

            </div>


          ) : (


            <div className="course-grid recommended-grid">


              {recommendedCourses.map(
                (course) => (


                  <div
                    className="course-card recommended-card"
                    key={course._id}
                  >


                    <div className="course-top recommended-top">


                      <span>
                        {course.category}
                      </span>


                      <div className="course-icon">
                        🚀
                      </div>


                    </div>



                    <div className="course-body">


                      <div className="course-code">

                        {course.courseCode}

                      </div>


                      <h3>

                        {course.courseName}

                      </h3>


                      <p>

                        {course.description}

                      </p>


                      <div className="course-info">


                        <span>

                          👨‍🏫{" "}

                          {course.teacher}

                        </span>


                        <span>

                          ⏱{" "}

                          {course.duration}

                        </span>


                      </div>



                      <div className="recommended-bottom">


                        <strong>

                          ₹{course.price}

                        </strong>


                        <button
                          className="enroll-btn"
                          onClick={() =>
                            enrollCourse(
                              course._id
                            )
                          }
                        >

                          Enroll Now →

                        </button>


                      </div>


                    </div>


                  </div>

                )
              )}

            </div>

          )}


        </section>



        {/* ==================================================
            AVAILABLE COURSES
        ================================================== */}

        <section
          className="dashboard-section"
          id="available-courses"
        >


          <div className="section-heading">


            <div>

              <span>
                DISCOVER
              </span>

              <h2>
                Available Courses
              </h2>

            </div>


            <div className="course-count">

              {courses.length}

              {" "}Courses

            </div>


          </div>



          {courses.length === 0 ? (


            <div className="empty-box">


              <div className="empty-icon">
                📚
              </div>


              <h3>
                No courses available
              </h3>


              <p>

                Admin has not added any
                courses yet.

              </p>


            </div>


          ) : (


            <div className="course-grid">


              {courses.map(
                (course) => (


                  <div
                    className="course-card"
                    key={course._id}
                  >


                    <div className="course-top">


                      <span>
                        {course.category}
                      </span>


                      <div className="course-icon">
                        📘
                      </div>


                    </div>



                    <div className="course-body">


                      <div className="course-code">

                        {course.courseCode}

                      </div>


                      <h3>

                        {course.courseName}

                      </h3>


                      <p>

                        {course.description}

                      </p>


                      <div className="course-info">


                        <span>

                          👨‍🏫{" "}

                          {course.teacher}

                        </span>


                        <span>

                          ⏱{" "}

                          {course.duration}

                        </span>


                      </div>



                      <div className="course-bottom">


                        <strong>

                          ₹{course.price}

                        </strong>



                        {alreadyEnrolled(
                          course._id
                        ) ? (


                          <button
                            className="enrolled-btn"
                            disabled
                          >

                            ✓ Enrolled

                          </button>


                        ) : (


                          <button
                            className="enroll-btn"
                            onClick={() =>
                              enrollCourse(
                                course._id
                              )
                            }
                          >

                            Enroll Now →

                          </button>

                        )}


                      </div>


                    </div>


                  </div>

                )
              )}

            </div>

          )}


        </section>



        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="dashboard-footer">


          <div>

            <strong>
              🎓 LearnHub
            </strong>

            <span>
              Learn today. Grow tomorrow.
            </span>

          </div>


          <p>
            Course Management System
          </p>


        </footer>


      </main>

    </div>

  );

}


export default StudentDashboard;