import React, { useState } from "react";
import "./SubmitStory.css";

const SubmitStory = () => {
  const [userName, setUserName] = useState("");
  const [submissionType, setSubmissionType] = useState("review");
  const [content, setContent] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const backendUrl = "http://localhost:5000"; // Backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubmission = {
      userName,
      submissionType,
      content,
    };

    try {
      const response = await fetch(`${backendUrl}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubmission),
      });

      if (response.ok) {
        alert("Submission saved successfully!");
        setUserName("");
        setSubmissionType("review");
        setContent("");
        fetchSubmissions(); // Refresh the submissions list
      } else {
        const errorData = await response.json();
        alert(`Failed to save submission: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving your submission!");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${backendUrl}/submissions`);
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching submissions!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Submit Your Story or Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <select
          value={submissionType}
          onChange={(e) => setSubmissionType(e.target.value)}
        >
          <option value="review">Review</option>
          <option value="story">Story</option>
        </select>
        <textarea
          placeholder="Write your story or review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitStory;
