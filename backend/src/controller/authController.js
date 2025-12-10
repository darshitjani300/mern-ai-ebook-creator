const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Helper: Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc   Register new user
// @route  POST /api/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    console.log(user);
    if (user) {
      return res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Login user
// @route   POST /api/auth/register
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const isMatch = await userExist.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    return res.status(200).json({
      message: "User is logged In",
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Get current loggedIn user
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated User" });
    }

    const userExist = await User.findById(req.user._id);
    if (userExist) {
      return res.status(200).json({
        message: "Profile found",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isPro: user.isPro,
        },
      });
    } else {
      return res.status(400).json({ message: "Profile does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;

      const updatedUser = await user.save();

      return res.status(200).json({
        message: "profile updated successfully",
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
        },
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
