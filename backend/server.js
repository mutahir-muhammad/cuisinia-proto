const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Path to the JSON file
const filePath = path.join(__dirname, "submissions.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize the JSON file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
}

// Helper function to read from the JSON file
const readSubmissions = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeSubmissions = (submissions) => {
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf8");
};

// Routes
app.post("/submit", (req, res) => {
  try {
    const submissions = readSubmissions();
    const newSubmission = {
      id: Date.now(),
      userName: req.body.userName,
      submissionType: req.body.submissionType,
      content: req.body.content,
      createdAt: new Date(),
    };
    submissions.push(newSubmission);
    writeSubmissions(submissions);
    res.status(201).json({ message: "Submission saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/submissions", (req, res) => {
  try {
    const submissions = readSubmissions();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/submissions/:id", (req, res) => {
    try {
      const { id } = req.params;
      const submissions = readSubmissions(); // Read the existing submissions
  
      const submissionIndex = submissions.findIndex((sub) => sub.id === parseInt(id));
  
      if (submissionIndex === -1) {
        return res.status(404).json({ message: "Submission not found" });
      }
  
      submissions.splice(submissionIndex, 1); // Remove the submission
      writeSubmissions(submissions); // Save the updated array to the file
  
      res.status(200).json({ message: "Submission deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

  app.put("/submissions/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const submissions = readSubmissions(); // Read the existing submissions
  
      const submissionIndex = submissions.findIndex((sub) => sub.id === parseInt(id));
  
      if (submissionIndex === -1) {
        return res.status(404).json({ message: "Submission not found" });
      }
  
      submissions[submissionIndex].content = content; // Update the content
      writeSubmissions(submissions); // Save the updated array to the file
  
      res.status(200).json({
        message: "Submission updated successfully",
        submission: submissions[submissionIndex],
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
