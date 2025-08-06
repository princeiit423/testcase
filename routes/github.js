const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/repos", async (req, res) => {
  try {
    const token = req.user.accessToken;
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${token}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/files", async (req, res) => {
  try {
    const { repo } = req.query;
    const token = req.user.accessToken;
    const username = req.user.profile.username;

    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents`, {
      headers: { Authorization: `token ${token}` }
    });
     const files = response.data; 
    res.render("files", {
      user: req.user.profile,
      repo,
      owner: username,
      files
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;