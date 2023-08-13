const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

async function getUsers() {
  const users = await User.find({});
  return users;
}

async function deleteUsers() {
  await User.deleteMany({ role: { $ne: "admin" } });
}

module.exports = { User, getUsers, deleteUsers };
