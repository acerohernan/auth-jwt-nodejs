const User = require("../models/User");

async function signUp(req, res) {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password: User.encryptPassword(password),
    });

    console.log(newUser);
    res.status(200).json({});
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
