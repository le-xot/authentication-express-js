const jwt = require("jsonwebtoken");
const redis = require("../server/redis.service");
const { SECRET_TOKEN_ACCESS, SECRET_TOKEN_REFRESH } = require("./environment.service");

function generateTokens(user) {
  const accessToken = jwt.sign({ user }, SECRET_TOKEN_ACCESS, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ user }, SECRET_TOKEN_REFRESH, {
    expiresIn: "7d",
  });

  redis.client.set(refreshToken, user.username, "EX", 7 * 24 * 60 * 60);

  return { accessToken, refreshToken };
}

module.exports = { generateTokens };
