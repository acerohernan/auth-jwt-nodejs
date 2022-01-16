const { send } = require("express/lib/response");
const User = require("../models/User");

async function getAll(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return send.statgus(400).json({ error });
  }
}

module.exports = { getAll };
