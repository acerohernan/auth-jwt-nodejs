const { config } = require("dotenv");
config();

module.exports = {
  port: process.env.PORT || 3500,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
