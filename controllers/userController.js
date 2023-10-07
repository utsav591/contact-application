import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/helper.js";

/**
 * This method takes three values in request body
 * name, email and password
 * and registers the user
 * @route POST /api/users
 * @body {name, email, password}.
 * @returns {object} - A a success response.
 * @throws {error} - If failes to register user.
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please send valid data");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      code: 201,
      remark: "user created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * This method takes two values in request body
 * email and password
 * and login the user
 * @route POST /api/users/login
 * @body {email, password}.
 * @returns {object} - A a success response.
 * @throws {error} - If failes to register user.
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please send valid data");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      code: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      remark: "success",
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


/**
 * This method updates user profile
 * @route PUT /api/users
 * @body {name, email, password?}.
 * @returns {object} - A a success response.
 * @throws {error} - If failes to register user.
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200);
    res.json({
      code: 200,
      remark: "success",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, loginUser, updateUserProfile };