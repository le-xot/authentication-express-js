const { User } = require("../repositories/user.repository.js");
const bcrypt = require("bcrypt");

async function login(username, password) {
  const user = await User.findOne({ username: username });
  
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return false;
}

module.exports = { login };
