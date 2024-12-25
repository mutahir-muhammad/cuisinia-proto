import React, { useEffect, useState } from "react";
import axios from "axios";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]); // Holds all submissions
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [editing, setEditing] = useState(null); // ID of the submission being edited
  const [editedContent, setEditedContent] = useState(""); // Content for the edited submission
  const [error, setError] = useState(""); // Error message

  const backendUrl = "http://localhost:5000"; // Replace with your backend URL

  // Fetch all submissions on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/submissions`);
        setSubmissions(response.data);
      } catch (err) {
        console.error("Error fetching submissions:", err.message);
        setError("Failed to fetch submissions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Handle editing mode for a specific submission
  const handleEdit = (submission) => {
    setEditing(submission.id);
    setEditedContent(submission.content);
  };

  // Handle saving edited content
  const handleUpdate = async (id) => {
    if (!editedContent.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(`${backendUrl}/submissions/${id}`, {
        content: editedContent,
      });

      if (response.status === 200) {
        setSubmissions((prev) =>
          prev.map((submission) =>
            submission.id === id ? { ...submission, content: editedContent } : submission
          )
        );
        setEditing(null);
        setError(""); // Clear any errors
      } else {
        setError("Failed to update the submission.");
      }
    } catch (err) {
      console.error("Error updating submission:", err.message);
      setError("An error occurred while updating. Please try again.");
    }
  };

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setEditing(null);
    setEditedContent("");
    setError(""); // Clear any errors
  };

  // Handle deleting a submission
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/submissions/${id}`);
      if (response.status === 200) {
        setSubmissions((prev) => prev.filter((submission) => submission.id !== id));
        setError(""); // Clear any errors
      } else {
        setError("Failed to delete the submission.");
      }
    } catch (err) {
      console.error("Error deleting submission:", err.message);
      setError("An error occurred while deleting. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Submissions</h2>

      {/* Display error message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Display loading spinner or submissions */}
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
              {submission.submissionType?.toUpperCase()}
            </h3>

            {editing === submission.id ? (
              <div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <button
                  onClick={() => handleUpdate(submission.id)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "5px 10px",
                    marginRight: "5px",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>{submission.content}</p>
            )}

            <small style={{ fontStyle: "italic" }}>
              By: {submission.userName || "Anonymous"}
            </small>
            <br />
            <small>
              Submitted on:{" "}
              {submission.createdAt
                ? new Date(submission.createdAt).toLocaleString()
                : "Unknown"}
            </small>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(submission)}
                style={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  padding: "5px 10px",
                  marginRight: "5px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(submission.id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No submissions yet.</p>
      )}
    </div>
  );
};

export default Submissions;
