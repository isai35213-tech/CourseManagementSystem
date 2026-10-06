import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("courseUser")
  );

  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    teacher: "",
    duration: "",
    category: "",
    price: ""
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/courses"
      );

      const data = await response.json();

      if (response.ok) {
        setCourses(data);
      } else {
        setMessage(data.message || "Unable to load courses");
      }
    } catch (error) {
      setMessage("Cannot connect to server.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      courseName: "",
      courseCode: "",
      description: "",
      teacher: "",
      duration: "",
      category: "",
      price: ""
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.courseName ||
      !formData.courseCode ||
      !formData.description ||
      !formData.teacher ||
      !formData.duration ||
      !formData.category ||
      formData.price === ""
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/courses/${editingId}`
        : "http://localhost:5000/api/courses";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(
        editingId
          ? "Course updated successfully!"
          : "Course added successfully!"
      );

      resetForm();
      fetchCourses();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Cannot connect to server.");
    }
  };

  const editCourse = (course) => {
    setEditingId(course._id);

    setFormData({
      courseName: course.courseName,
      courseCode: course.courseCode,
      description: course.description,
      teacher: course.teacher,
      duration: course.duration,
      category: course.category,
      price: course.price
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete course");
        return;
      }

      setMessage("Course deleted successfully!");

      fetchCourses();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Cannot connect to server.");
    }
  };

  const logout = () => {
    localStorage.removeItem("courseUser");
    navigate("/login");
  };

  const scrollToCourses = () => {
    document
      .getElementById("manage-courses")
      ?.scrollIntoView({
        behavior: "smooth"
      });
  };

  const categories = [
    "All",
    ...new Set(
      courses
        .map((course) => course.category)
        .filter(Boolean)
    )
  ];

  const filteredCourses = courses.filter((course) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      course.courseName
        ?.toLowerCase()
        .includes(searchText) ||
      course.courseCode
        ?.toLowerCase()
        .includes(searchText) ||
      course.teacher
        ?.toLowerCase()
        .includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      course.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const teacherCount = new Set(
    courses.map((course) => course.teacher)
  ).size;

  const averagePrice =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total + Number(course.price || 0),
            0
          ) / courses.length
        )
      : 0;

  return (
    <div className="dashboard-page admin-dashboard">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            🎓
          </div>

          <div>
            <h2>LearnHub</h2>
            <span>Course Management</span>
          </div>

        </div>

        <nav className="sidebar-menu">

          <button
            className="menu-item active"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className="menu-item"
            onClick={scrollToCourses}
          >
            <span>📚</span>
            Manage Courses
          </button>

          <button
            className="menu-item"
            onClick={() => {
              setEditingId(null);

              setFormData({
                courseName: "",
                courseCode: "",
                description: "",
                teacher: "",
                duration: "",
                category: "",
                price: ""
              });

              setShowForm(true);

              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }}
          >
            <span>➕</span>
            Add Course
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-help">

            <div className="help-icon">
              ⚙️
            </div>

            <div className="help-content">

              <strong>Admin Panel</strong>

              <p>
                Manage courses, teachers and
                keep your learning platform
                organized.
              </p>

            </div>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              ADMIN DASHBOARD
            </p>

            <h1>
              Welcome,{" "}
              <span>
                {user?.name || "Admin"}!
              </span>
            </h1>

            <p className="header-subtitle">
              Manage your courses and learning
              platform from one place.
            </p>

          </div>

          <div className="profile-box">

            <div className="profile-avatar admin-avatar">
              {(user?.name || "A")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <strong>
                {user?.name || "Admin"}
              </strong>

              <small>
                {user?.email}
              </small>

            </div>

          </div>

        </header>


        {/* MESSAGE */}

        {message && (
          <div className="dashboard-message">
            <span>✓</span>
            {message}
          </div>
        )}


        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              📚
            </div>

            <div>
              <span>Total Courses</span>
              <h2>{courses.length}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              👨‍🎓
            </div>

            <div>
              <span>Students</span>
              <h2>Active</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              👨‍🏫
            </div>

            <div>
              <span>Teachers</span>
              <h2>{teacherCount}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              ₹
            </div>

            <div>
              <span>Average Price</span>
              <h2>₹{averagePrice}</h2>
            </div>

          </div>

        </section>


        {/* ADMIN BANNER */}

        <section className="welcome-banner admin-banner">

          <div className="welcome-text">

            <span className="banner-label">
              ADMIN CONTROL CENTER
            </span>

            <h2>
              Manage your
              <br />
              learning platform.
            </h2>

            <p>
              Add new courses, update existing
              courses and organize your complete
              course catalog.
            </p>

            <button
              className="explore-btn"
              onClick={() => {
                setEditingId(null);
                setShowForm(true);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              Add New Course
              <b>→</b>
            </button>

          </div>

          <div className="welcome-illustration">

            <div className="illustration-circle">
              🧑‍💼
            </div>

            <div className="floating-card card-one">
              📚 {courses.length} Courses
            </div>

            <div className="floating-card card-two">
              ✓ Platform Active
            </div>

          </div>

        </section>


        {/* ADD / EDIT COURSE FORM */}

        {showForm && (

          <section className="admin-form-section">

            <div className="form-header">

              <div>

                <span>
                  {editingId
                    ? "UPDATE COURSE"
                    : "CREATE COURSE"}
                </span>

                <h2>
                  {editingId
                    ? "Edit Course"
                    : "Add New Course"}
                </h2>

                <p>
                  Fill in the course details below.
                </p>

              </div>

              <button
                className="close-form"
                onClick={resetForm}
              >
                ✕
              </button>

            </div>


            <form
              className="course-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Course Name
                  </label>

                  <input
                    type="text"
                    name="courseName"
                    placeholder="Example: Full Stack Web Development"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Course Code
                  </label>

                  <input
                    type="text"
                    name="courseCode"
                    placeholder="Example: FS101"
                    value={formData.courseCode}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Teacher
                  </label>

                  <input
                    type="text"
                    name="teacher"
                    placeholder="Enter teacher name"
                    value={formData.teacher}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="Example: Web Development"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Duration
                  </label>

                  <input
                    type="text"
                    name="duration"
                    placeholder="Example: 8 Weeks"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Price
                  </label>

                  <div className="price-input">

                    <span>₹</span>

                    <input
                      type="number"
                      name="price"
                      placeholder="Enter course price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      required
                    />

                  </div>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter a short description about this course"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingId
                    ? "✓ Update Course"
                    : "+ Add Course"}
                </button>

              </div>

            </form>

          </section>

        )}


        {/* MANAGE COURSES */}

        <section
          className="dashboard-section"
          id="manage-courses"
        >

          <div className="section-heading">

            <div>

              <span>
                COURSE MANAGEMENT
              </span>

              <h2>
                Manage Courses
              </h2>

            </div>

            <div className="course-count">
              {courses.length} Courses
            </div>

          </div>


          {/* SEARCH */}

          <div className="admin-search-box">

            <div className="search-input-wrapper">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search by course name, code or teacher..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  ✕
                </button>
              )}

            </div>


            <div className="category-filter">

              {categories.map((category) => (

                <button
                  key={category}
                  className={
                    categoryFilter === category
                      ? "category-btn active"
                      : "category-btn"
                  }
                  onClick={() =>
                    setCategoryFilter(category)
                  }
                >
                  {category}
                </button>

              ))}

            </div>

          </div>


          {/* COURSE LIST */}

          {filteredCourses.length === 0 ? (

            <div className="empty-box">

              <div className="empty-icon">
                📚
              </div>

              <h3>
                {courses.length === 0
                  ? "No courses added"
                  : "No matching courses"}
              </h3>

              <p>
                {courses.length === 0
                  ? "Start by adding your first course."
                  : "Try another search or category."}
              </p>

              {courses.length === 0 && (

                <button
                  className="browse-empty-btn"
                  onClick={() =>
                    setShowForm(true)
                  }
                >
                  + Add Course
                </button>

              )}

            </div>

          ) : (

            <div className="course-grid">

              {filteredCourses.map((course) => (

                <div
                  className="course-card admin-course-card"
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
                        👨‍🏫 {course.teacher}
                      </span>

                      <span>
                        ⏱ {course.duration}
                      </span>

                    </div>


                    <div className="admin-course-actions">

                      <strong>
                        ₹{course.price}
                      </strong>

                      <div className="admin-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editCourse(course)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteCourse(
                              course._id
                            )
                          }
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* FOOTER */}

        <footer className="dashboard-footer">

          <span>
            © 2026 <strong>LearnHub</strong>
            {" "}Course Management System
          </span>

          <span>
            Admin Panel • Platform Active
          </span>

        </footer>

      </main>

    </div>
  );
}

export default AdminDashboard;