import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("student");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /*
  ==================================================
  LOGIN / REGISTER
  ==================================================
  */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // REGISTER VALIDATION

    if (isRegister && !name.trim()) {

      setError(
        "Please enter your full name"
      );

      return;
    }


    // EMAIL VALIDATION

    if (!email.trim()) {

      setError(
        "Please enter your email"
      );

      return;
    }


    // PASSWORD VALIDATION

    if (!password.trim()) {

      setError(
        "Please enter your password"
      );

      return;
    }


    setLoading(true);


    try {

      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";


      const body = isRegister
        ? {
            name: name.trim(),
            email: email.trim(),
            password: password,
            role: role
          }
        : {
            email: email.trim(),
            password: password
          };


      const response =
        await fetch(url, {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(body)

        });


      const data =
        await response.json();


      // ERROR

      if (!response.ok) {

        setError(
          data.message ||
          "Something went wrong"
        );

        setLoading(false);

        return;
      }


      /*
      ==============================================
      REGISTER SUCCESS
      ==============================================
      */

      if (isRegister) {

        setSuccess(
          "Registration successful! Please login."
        );

        // Clear fields
        setName("");
        setEmail("");
        setPassword("");

        // Switch to login
        setIsRegister(false);

        setLoading(false);

        return;
      }


      /*
      ==============================================
      LOGIN SUCCESS
      ==============================================
      */

      const loggedInUser = {

        name: data.user.name,

        email: data.user.email,

        role: data.user.role

      };


      // Save user in browser
      localStorage.setItem(
        "courseUser",
        JSON.stringify(
          loggedInUser
        )
      );


      // Go to dashboard

      if (
        data.user.role === "admin"
      ) {

        navigate("/admin");

      } else if (
        data.user.role === "student"
      ) {

        navigate("/student");

      } else {

        setError(
          "Invalid user role"
        );

      }

    } catch (error) {

      console.log(error);

      setError(
        "Unable to connect to server. Make sure backend is running."
      );

    }


    setLoading(false);
  };


  /*
  ==================================================
  SWITCH LOGIN / REGISTER
  ==================================================
  */

  const switchMode = () => {

    setIsRegister(!isRegister);

    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");

  };


  return (

    <div className="login-page">


      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <div className="login-left">

        <div className="login-brand">

          <span className="brand-icon">
            🎓
          </span>

          <span>
            LearnHub
          </span>

        </div>


        <div className="login-welcome">

          <span className="welcome-badge">
            LEARN • GROW • SUCCEED
          </span>


          <h1>

            Welcome to
            <br />

            <span>
              LearnHub
            </span>

          </h1>


          <p>
            Manage your courses, learn new
            skills, complete quizzes and
            earn certificates.
          </p>


          <div className="login-features">


            <div className="feature-item">

              <span>
                📚
              </span>

              <div>

                <strong>
                  Learn Anytime
                </strong>

                <small>
                  Access your courses easily
                </small>

              </div>

            </div>


            <div className="feature-item">

              <span>
                🎯
              </span>

              <div>

                <strong>
                  Track Progress
                </strong>

                <small>
                  Monitor your learning journey
                </small>

              </div>

            </div>


            <div className="feature-item">

              <span>
                🏆
              </span>

              <div>

                <strong>
                  Earn Certificates
                </strong>

                <small>
                  Complete courses and quizzes
                </small>

              </div>

            </div>


          </div>

        </div>

      </div>



      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <div className="login-right">


        <div className="login-card">


          <div className="login-card-header">

            <div className="login-icon">

              {isRegister
                ? "📝"
                : "🔐"}

            </div>


            <h2>

              {isRegister
                ? "Create Account"
                : "Sign In"}

            </h2>


            <p>

              {isRegister
                ? "Create your student account"
                : "Enter your details to continue"}

            </p>

          </div>



          {/* ERROR */}

          {error && (

            <div className="login-error">

              ⚠️ {error}

            </div>

          )}



          {/* SUCCESS */}

          {success && (

            <div className="login-success">

              ✅ {success}

            </div>

          )}



          <form
            onSubmit={handleSubmit}
          >


            {/* FULL NAME */}

            {isRegister && (

              <div className="input-group">

                <label>
                  Full Name
                </label>


                <div className="input-wrapper">

                  <span className="input-icon">
                    👤
                  </span>


                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>

              </div>

            )}



            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>


              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>


                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>



            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>


              <div className="input-wrapper">

                <span className="input-icon">
                  🔑
                </span>


                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>



            {/* ROLE */}

            {isRegister && (

              <div className="input-group">

                <label>
                  Account Type
                </label>


                <div className="input-wrapper">

                  <span className="input-icon">
                    🎓
                  </span>


                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                  >

                    <option value="student">
                      Student
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>

              </div>

            )}



            {/* BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account →"
                : "Sign In →"}

            </button>


          </form>



          {/* SWITCH */}

          <div className="login-switch">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}


            <button
              type="button"
              onClick={switchMode}
            >

              {isRegister
                ? " Sign In"
                : " Register"}

            </button>

          </div>



          <div className="login-footer">

            <span>
              🎓
            </span>

            Course Management System

          </div>


        </div>

      </div>

    </div>

  );
}

export default Login;