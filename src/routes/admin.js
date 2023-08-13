const express = require("express");
const router = express.Router();
const path = require("path");
const { deleteUsers } = require("../repositories/user.repository.js");
const { getUsers } = require("../repositories/user.repository.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../static/admin.html"));
});

router.get("/api/users", authMiddleware, async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.get("/exit", (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/");
});

router.post("/delete", authMiddleware, async (req, res) => {
  await deleteUsers();
  res.redirect("/admin");
});

module.exports = router;
