const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authResponse = require("../models/response/authResponse"); // Đường dẫn đến tệp authResponse.js
const { role } = require("../enums/role");
const admin = require("../config/firebaseConfig");
const auth = require("../models/auth");

let login = async (req, res) => {
  const { username, password } = req.body;

  const user = await auth.findOne({ username });

  if (!user) return res.status(400).send("Username or password is wrong");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const responseData = authResponse(user, token);

  res.json(responseData);
};

let register = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    username,
    email,
    password: hashedPassword,
    fullName,
  };

  try {
    const createdUser = await auth.create(newUser);
    return res.status(201).json(authResponse(createdUser));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send("Username or email already exists");
    }
    if (err.name === "ValidationError") {
      return res.status(400).send(err.message);
    }
    return res.status(500).send("Server error");
  }
};

let loginGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    let user = await auth.findOne({ email });

    if (!user) {
      const newUser = {
        username: email,
        email: email,
        fullName: decodedToken.name,
      };
      user = await auth.create(newUser);
    }

    return res.json(
      authResponse(
        user,
        jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
      )
    );
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = { login, register, loginGoogle };
