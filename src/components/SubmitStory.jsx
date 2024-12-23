import React, { useState } from "react";
import "./SubmitStory.css"; // Save the CSS above in this file

const SubmitStory = () => {
  const [userName, setUserName] = useState("");
  const [submissionType, setSubmissionType] = useState("review");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to save the story
      alert("Submission successful!");
      setUserName("");
      setSubmissionType("review");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Error submitting your story!");
    }
  };

  return (
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
  );
};

export default SubmitStory;
