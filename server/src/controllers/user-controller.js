import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


    res.status(200).cookie("access_token", access_token, {
      httpOnly: true,
    })
      .json({
        status: "success",
        access_token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const updateUser = async (req, res) => {

  const userId = req.user.id;
  try {
    if (userId === req.params.id) {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).json(updatedUser);
    }
    else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const logout = async (req, res) => {
  res.clearCookie("access_token").json({ message: "Logged out" });
  res.user = null;
};

