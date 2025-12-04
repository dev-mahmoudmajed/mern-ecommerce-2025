import User from "../models/user.model.js";
import CryptoJS from "crypto-js";
import { PASS_SEC, JWT_SECRET, JWT_EXPIRES_IN } from "../config/config.js";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString(),
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    // Find the user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong credentials!");

    // Decrypt the password
    const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // Compare the password
    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong credentials!");

    // Generate a token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return the user without the password
    const { password: _, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
