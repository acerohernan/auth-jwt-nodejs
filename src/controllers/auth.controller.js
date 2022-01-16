const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Role = require("../models/Role");

async function signUp(req, res) {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    }

    if (!roles) {
      const role = Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.jwt.secret, {
      expiresIn: 86400, //24hours
    });

    console.log(newUser);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
}
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign({ id: userFound._id }, config.jwt.secret, {
      expiresIn: 86400, //24hours
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  signIn,
  signUp,
};
