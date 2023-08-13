const { User } = require("../repositories/user.repository.js");
const bcrypt = require("bcrypt");

async function register(username, password) {
  const user = await User.findOne({ username: username });

  if (user === null) {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hash,
    });

    return newUser;
  }
  
  return false;
}

module.exports = { register };
