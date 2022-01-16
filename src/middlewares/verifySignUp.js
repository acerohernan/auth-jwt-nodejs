const ROLES = require("../utils/Roles");
const User = require("../models/User");

async function checkUsernameOrEmailDuplicated(req, res, next) {
  const { username, email } = req.body;

  const user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: "Username already exists" });

  const userEmail = await User.findOne({ email });
  if (userEmail)
    return res.status(400).json({ message: "The email already exists" });

  next();
}

function checkRolesExists(req, res, next) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exists`,
        });
      }
    }
  }

  next();
}

module.exports = {
  checkUsernameOrEmailDuplicated,
  checkRolesExists,
};
