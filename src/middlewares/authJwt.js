const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");
const Role = require("../models/Role");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res.status(400).json({
        messsage: "Token not found",
      });

    const decoded = jwt.verify(token, config.jwt.secret);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(400).json({ message: "Not user found" });

    next();
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function isModerator(req, res, next) {
  const user = await User.findOne({ _id: req.userId }, { password: 0 });
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Require Moderator Role" });
}

async function isAdmin(req, res, next) {
  const user = await User.findOne({ _id: req.userId }, { password: 0 });
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Require Admin Role" });
}

module.exports = {
  verifyToken,
  isModerator,
  isAdmin,
};
