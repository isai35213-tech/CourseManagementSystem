import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div>

      <nav className="navbar">

        <div className="logo">
          🎓 COURSE
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/courses">
            Courses
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>

      </nav>


      <section className="hero">

        <div className="hero-content">

          <span className="badge">
            COURSE MANAGEMENT SYSTEM
          </span>

          <h1>
            Learn Today.
            <br />
            Build Your Future.
          </h1>

          <p>
            Discover courses, develop new skills,
            and manage your learning journey
            with Course.
          </p>

          <Link to="/courses">

            <button className="primary-btn">
              Explore Courses →
            </button>

          </Link>

        </div>

      </section>


      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">
            📚
          </div>

          <h3>
            Quality Courses
          </h3>

          <p>
            Explore courses designed
            for practical learning.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            👨‍🏫
          </div>

          <h3>
            Expert Teachers
          </h3>

          <p>
            Learn from experienced
            instructors.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            🚀
          </div>

          <h3>
            Grow Your Skills
          </h3>

          <p>
            Improve your knowledge
            and career skills.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;