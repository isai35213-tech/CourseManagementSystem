import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/courses"
      );

      const data = await response.json();

      setCourses(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    getCourses();

  }, []);


  const handleEnroll = async (courseId) => {

    const user = JSON.parse(
      localStorage.getItem("courseUser")
    );


    // Login required
    if (!user) {

      alert("Please login as a student to enroll.");

      navigate("/login");

      return;
    }


    // Admin cannot enroll
    if (user.role !== "student") {

      alert("Only students can enroll in courses.");

      return;
    }


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
            courseId: courseId
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.message);

        return;
      }


      alert("Course enrolled successfully!");


    } catch (error) {

      console.log(error);

      alert(
        "Unable to enroll. Please check backend."
      );

    }
  };


  return (

    <div className="courses-page">


      {/* NAVBAR */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          COURSE
        </div>


        <div className="nav-links">

          <button
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/courses")}
          >
            Courses
          </button>

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <div className="courses-container">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>


        <h1>Available Courses</h1>

        <p>
          Explore our courses and start learning today.
        </p>


        {loading ? (

          <h3>Loading courses...</h3>

        ) : courses.length === 0 ? (

          <h3>No courses available.</h3>

        ) : (

          <div className="course-grid">

            {courses.map((course) => (

              <div
                className="course-card"
                key={course._id}
              >

                <span className="course-category">
                  {course.category}
                </span>


                <h2>
                  {course.courseName}
                </h2>


                <p className="course-code">
                  Code: {course.courseCode}
                </p>


                <p>
                  {course.description}
                </p>


                <div className="course-info">

                  <span>
                    👨‍🏫 {course.teacher}
                  </span>

                  <span>
                    ⏱ {course.duration}
                  </span>

                </div>


                <h3>
                  ₹{course.price}
                </h3>


                <button
                  className="enroll-btn"
                  onClick={() =>
                    handleEnroll(course._id)
                  }
                >
                  Enroll Now
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Courses;