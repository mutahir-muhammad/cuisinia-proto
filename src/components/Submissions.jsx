import React, { useEffect, useState } from "react";
import axios from "axios";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/submissions");
        setSubmissions(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Submissions</h2>
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading submissions...</p>
      ) : submissions.length > 0 ? (
        submissions.map((submission) => (
          <div
            key={submission.id}
            style={{
              margin: "10px auto",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "400px",
            }}
          >
            <h3 style={{ color: "#ff6f61" }}>
              {submission.submissionType.toUpperCase()}
            </h3>
            <p>{submission.content}</p>
            <small style={{ fontStyle: "italic" }}>
              By: {submission.userName}
            </small>
            <br />
            <small>
              Submitted on: {new Date(submission.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No submissions yet.</p>
      )}
    </div>
  );
};

export default Submissions;
