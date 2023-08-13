const express = require("express");
const router = express.Router();
const path = require("path");
const { login } = require("../services/login.service.js");
const { generateTokens } = require("../services/generateTokens.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/login.html"));
});

router.get("/denied", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/denied.html"));
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await login(username, password);

  if (user) {
    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    return res.redirect("/admin");
  }
  
  return res.redirect("/login/denied");
});

module.exports = router;
