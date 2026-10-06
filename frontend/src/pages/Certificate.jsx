import React from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";

import "./Learning.css";

function Certificate() {
  const location = useLocation();
  const navigate = useNavigate();

  const certificate =
    location.state?.certificate;

  if (!certificate) {
    return (
      <div className="learning-empty">
        <h2>
          Certificate not found
        </h2>

        <button
          onClick={() =>
            navigate("/student")
          }
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const course =
    certificate.course;

  const date = new Date(
    certificate.issuedAt
  ).toLocaleDateString();

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="certificate-page">

      <div className="certificate-actions">

        <button
          onClick={() =>
            navigate("/student")
          }
        >
          ← Dashboard
        </button>

        <button
          onClick={printCertificate}
        >
          🖨 Print / Download
        </button>

      </div>

      <div className="certificate">

        <div className="certificate-border">

          <div className="certificate-logo">
            🎓 LearnHub
          </div>

          <span className="certificate-small">
            CERTIFICATE OF COMPLETION
          </span>

          <h1>
            Certificate
          </h1>

          <p className="certificate-intro">
            This certificate is proudly presented
            to
          </p>

          <h2 className="student-name">
            {certificate.studentName}
          </h2>

          <p className="certificate-intro">
            for successfully completing the course
          </p>

          <h2 className="certificate-course">
            {course?.courseName}
          </h2>

          <p className="certificate-description">
            The student has successfully completed
            the course requirements and passed the
            related assessment.
          </p>

          <div className="certificate-footer">

            <div>
              <strong>
                {date}
              </strong>

              <span>
                Issue Date
              </span>
            </div>

            <div className="certificate-seal">
              🏆
            </div>

            <div>
              <strong>
                {certificate.certificateId}
              </strong>

              <span>
                Certificate ID
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Certificate;