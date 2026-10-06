import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseLearning from "./pages/CourseLearning";
import Payment from "./pages/Payment";

import "./App.css";


/* =========================
   PROTECTED ROUTE
========================= */

function ProtectedRoute({ children, role }) {

  const user = JSON.parse(
    localStorage.getItem("courseUser")
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.role !== role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* =========================
   APP
========================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />


        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">

              <StudentDashboard />

            </ProtectedRoute>
          }
        />


        {/* ================= PAYMENT ================= */}

        <Route
          path="/payment/:courseId"
          element={
            <ProtectedRoute role="student">

              <Payment />

            </ProtectedRoute>
          }
        />


        {/* ================= COURSE LEARNING ================= */}

        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute role="student">

              <CourseLearning />

            </ProtectedRoute>
          }
        />


        {/* ================= INVALID URL ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;