const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    const savedUser = await newUser.save();

    jwt.sign({ id: savedUser });

    res.status(200).json({ message: "Successfully registered", savedUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
}
async function signIn(req, res) {
  try {
    res.status(200).json({});
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  signIn,
  signUp,
};
