import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EmailService } from "../services/email.service.js";


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
      isVerified: false, // Kullanıcı doğrulanmamış olarak kaydediliyor.
    });

    // Doğrulama için JWT token oluştur
    const verificationToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Doğrulama linki oluştur
    const verificationURL = `${process.env.API_PATH === 'production' ? process.env.CLIENT_URL : process.env.CLIENT_LOCAL_URL}/verify-account?token=${verificationToken}`;

    // E-posta gönderimi
    const options = {
      name: user.name,
      email: user.email,
      subject: "Dein Shop [Welcome to Our App! Verify Your Account]",
      verificationURL,
    };

    await EmailService.sendVerificationEmail(options);

    res.status(201).json({
      status: "success",
      message: "Check your email for a link to verify your account. If it doesn’t appear within a few minutes, check your spam folder..",
    });
    // res.status(201).json({
    //   status: "success",
    //   message: "User created successfully",
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role
    //   }
    // });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const verifyAccount = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Account verified successfully. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
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

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your account before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).cookie("access_token", access_token, {
      httpOnly: true,
    }).json({
      status: "success",
      access_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


// export const login = async (req, res) => {

//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please provide all fields" });
//     }
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


//     res.status(200).cookie("access_token", access_token, {
//       httpOnly: true,
//     }).json({
//       status: "success",
//       access_token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image: user.image
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// };

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    await UserModel.findByIdAndUpdate(user._id, { reset_password_key: token });
    const resetURL = `${process.env.API_PATH === 'production' ? process.env.CLIENT_URL : process.env.CLIENT_LOCAL_URL}/reset-password?reset_password_key=${token}`;
    const options = {
      name: user.name,
      email: user.email,
      subject: "Dein Shop [Reset your password]",
      resetURL,
    };

    await EmailService.sendForgotPasswordEmail(options);

    res.status(200).json({
      status: "success",
      message: "Email sent"
    });
  }
  catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}

export const resetPassword = async (req, res) => {

  const { reset_password_key } = req.params;
  const { password } = req.body;

  try {
    if (!reset_password_key || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await UserModel.findOne({ reset_password_key: reset_password_key });
    if
      (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const decoded = jwt.verify(reset_password_key, process.env.JWT_SECRET);

    if (user._id.toString() !== decoded.id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.findOneAndUpdate({ reset_password_key: reset_password_key }, { password: hashedPassword, reset_password_key: null });

    res.status(200).json({
      status: "success",
      message: "Password reset successfully"
    });
  }
  catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}

export const updateUser = async (req, res) => {

  const userId = req.user.id;
  const { name, image } = req.body;
  try {
    if (userId) {
      const user = await UserModel.findByIdAndUpdate(userId, { name, image }, { new: true });

      const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(200).cookie("access_token", access_token, {
        httpOnly: true,
      }).json({
        status: "success",
        access_token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image
        }
      });
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

