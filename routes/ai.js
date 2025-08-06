const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/summary", async (req, res) => {
  try {
    const { fileUrl, filePath, repoOwner, repoName } = req.body;
    //console.log(repoOwner);

    // Fetch raw file content from GitHub
    const response = await axios.get(fileUrl);
    const fileContent = response.data;

    const prompt = `Generate a test case summary for the following file (${filePath}) in repository ${repoOwner}/${repoName}:\n\n${fileContent}`;

    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const summary = aiResponse.data.candidates[0].content.parts[0].text;

    res.render("summary", { summary, filePath });
  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(500).send("Failed to generate summary");
  }
});

router.post("/generate-code", async (req, res) => {
  try {
    const { summary } = req.body;

    const prompt = `Generate full JUnit/Selenium test code for this test case summary:\n\n${summary}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const code = response.data.candidates[0].content.parts[0].text;

    // ✅ Renders a page and passes the generated code to EJS
    res.render("generated-code", { code });
  } catch (err) {
    res.status(500).render("error", { message: "Failed to generate code.", error: err.message });
  }
});

module.exports = router;
