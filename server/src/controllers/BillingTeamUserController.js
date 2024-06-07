const BillingTeamUser = require("../model/BillingTeamUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const billingTeamRegistration = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    branch_name,
    branch_state,
    branch_city,
    branch_pincode,
  } = req.body;

  // Logging input for debugging purposes
  console.log(
    name,
    email,
    password,
    branch_name,
    branch_state,
    branch_city,
    branch_pincode
  );

  // Check for missing fields
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !branch_name ||
    !branch_state ||
    !branch_city ||
    !branch_pincode
  ) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    // Check if the user already exists
    const isUserAvailable = await BillingTeamUser.findOne({ email });
    if (isUserAvailable) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new BillingTeamUser({
      name,
      email,
      password,
      phone,
      address,
      branch_name,
      branch_state,
      branch_city,
      branch_pincode,
    });

    // Save the new user to the database
    const result = await newUser.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "User registered successfully", user: result });
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    // Respond with an error message
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const billingTeamLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Find the user by email
    const user = await BillingTeamUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = generateToken(user._id);

    // Respond with token and user details
    res.status(200).json({
      message: "Admin logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        branch_name: user.branch_name,
        branch_state: user.branch_state,
        branch_city: user.branch_city,
        branch_pincode: user.branch_pincode,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { billingTeamRegistration, billingTeamLogin };
