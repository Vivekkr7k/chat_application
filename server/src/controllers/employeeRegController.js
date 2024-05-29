const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeReg = require("../model/employeeRegModel");

const registerEmployee = asyncHandler(async (req, res) => {
  const { name, password, confirmPassword, employeeId, state, language, grade, group } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password and confirm password do not match!" });
  }

  // Validate other mandatory fields
  if (!name || !password || !confirmPassword  || !employeeId || !state || !grade || !group) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  // let user_id;
  // if (req.userAdministrator) {
  //   user_id = req.userAdministrator.id;
  // } else {
  //   return res.status(401).json({ error: "User not authenticated" });
  // }

  const employeeAvailable = await EmployeReg.findOne({ employeeId });
  if (employeeAvailable) {
    return res.status(400).json({ error: "User already registered!" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const employeeRegistration = await EmployeReg.create({
    name,
    password: hashedPassword,
    confirmPassword:hashedPassword,
    employeeId,
    state,
    language,
    grade,
    group,
   
  });

  res.status(201).json({ employeeRegistration });
});

const loginUser = asyncHandler(async (req, res) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }

  const employeeAvailable = await EmployeReg.findOne({ employeeId });
  if (!employeeAvailable || !(await bcrypt.compare(password, employeeAvailable.password))) {
    return res.status(401).json({ error: "Employee ID or password is not valid" });
  }

  const accessToken = jwt.sign(
    {
      useremployeeAvailable: {
        id: employeeAvailable.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json({ accessToken, employeeGrade: employeeAvailable.grade, employeeTeam: employeeAvailable.group });
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await EmployeReg.find();
  res.status(200).json(employees);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const updatedData = req.body;

  const updatedEmployee = await EmployeReg.findOneAndUpdate(
    { employeeId },
    updatedData,
    { new: true } // Return the updated document
  );

  if (!updatedEmployee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json({ message: 'Employee details updated successfully', updatedEmployee });
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const result = await EmployeReg.deleteOne({ employeeId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json({ message: "Employee deleted successfully" });
});

module.exports = { registerEmployee, loginUser, getAllEmployees, updateEmployee, deleteEmployee };
