const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const EmployeReg=require("../model/employeeRegModel")





const registerEmployee = asyncHandler(async (req, res) => {
    const { name, password, confirmPassword, employeeId, state, language, grade, teamName } = req.body;
  
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Password and confirm password do not match!");
    }
  
    if (!name || !password || !confirmPassword || !employeeId || !state || !grade || !teamName) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
  
    const employeeAvailable = await EmployeReg.findOne({ employeeId });
    if (employeeAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const employeeRegistration = await EmployeReg.create({
      name,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Not necessary to store hashed confirmPassword separately
      employeeId,
      state,
      language,
      grade,
      teamName,
      user_id: req.userAdministrator.id,
    });
  
    if (employeeRegistration) {
      res.status(201).json({ employeeRegistration });
    } else {
      res.status(400);
      throw new Error("Employee registration data is not valid");
    }
  });

//login for the emplyee Member you need employeeId  && password

const loginUser = asyncHandler(async (req, resp) => {
    const { employeeId, password } = req.body;
    console.log("res   ",employeeId,password)
    if (!employeeId || !password) {
        resp.status(400);
        throw new Error("All fields are mandatory !");
        console.log("hi")
    }

    const employeeAvailable = await EmployeReg.findOne({ employeeId });
    //compare password with hashedpassword
    if (employeeAvailable && (await bcrypt.compare(password,employeeAvailable.password)))
    {
        const accessToken = jwt.sign(
            {

            useremployeeAvailable:{
           
                employeeId:employeeAvailable.employeeId,
                id: employeeAvailable.id,

            },
        },process.env.ACCESS_TOKEN_SECRET,
         {
expiresIn: "15m"  }
        );

        resp.status(200).json({accessToken ,employeeGrade:employeeAvailable.grade ,employeeTeam:employeeAvailable.teamName});
    }
    else{
        resp.status(401);
        throw new Error("employeeId or password is not valid")
    }

        resp.json({ message: "login the admin" });
});


module.exports = { registerEmployee ,loginUser}