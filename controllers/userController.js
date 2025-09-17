import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const nameExixts = await User.findOne({ name });
    if (nameExixts) {
      return res
        .status(400)
        .json({ success: false, message: "Name Already Exists" });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    return res.status(201).json({
      success: true,
      message: "User Register Successfull",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Field are required" });
    }
    const user = await User.findOne({ name }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Token Generate Here
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
  const isProduction = process.env.NODE_ENV === "production";
    // Set Cookies Here
    const option = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    return res.cookie("authToken", token, option).status(200).json({
      success: true,
      message: "User Login Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `internal Server Error ${error.message}`,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while logging out",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, logoutUser,getAllUser };
