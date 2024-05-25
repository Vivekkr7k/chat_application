const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const AdminReg = require("../model/adminRegModel")

const EmployeeReg=require("../model/employeeRegModel")


// @desc Register a admin
//@route POST/api/users/register
//@access public


const registerUser = asyncHandler(async (req, resp) => {

    const { email, password, confirmPassword } = req.body;
    if(password !== confirmPassword )
    {
        resp.status(400);
        throw new Error("password and confirmPassword are not matched !");
      }

    if (  !email || !password || !confirmPassword) {
        resp.status(400);
        throw new Error("All fields are mandatory !");
    }

    const administratorUserAvailable = await AdminReg.findOne({ email });
    if (administratorUserAvailable) {
        resp.status(400);
        throw new Error("User already registered !");
    }



    //Hash password;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword)
    console.log("hi")
//console.log
    //Hash confirmPassword;

    const hashedCpassword = await bcrypt.hash(confirmPassword, 10);
    console.log("Hashed CPassword", hashedCpassword);

 
    const administrator = await AdminReg.create({
    
        email,
        password: hashedPassword,
        confirmPassword: hashedCpassword
    });
    console.log(`AdminReg User created ${administrator}`);
    if (administrator) {
        resp.status(201).json({ _id: administrator.id, email: administrator.email });
    }
    else {
        resp.status(400);
        throw new Error("administrator data us not valid");
    }



    resp.status(200).json({ message: " Register the administrator" })
});







// @desc Login a user
//@route POST/api/users/login
//@access public


const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    console.log("res   ",email,password)
    if (!email || !password) {
        resp.status(400);
        throw new Error("All fields are mandatory !");
    }

    const administrator = await AdminReg.findOne({ email });
    //compare password with hashedpassword
    if (administrator && (await bcrypt.compare(password,administrator.password)))
    {
        const accessToken = jwt.sign(
            {

            userAdministrator:{
           
                email:administrator.email,
                id: administrator.id,

            },
        },process.env.ACCESS_TOKEN_SECRET,
         {
expiresIn: "15m"  }
        );

        resp.status(200).json({accessToken});
    }
    else{
        resp.status(401);
        throw new Error("email or password is not valid")
    }

        resp.json({ message: "login the admin" });
});


// @desc current  userinfo
//@route POST/api/users/current
//@access private


const currentUser = asyncHandler(async (req, resp) => {
    resp.json(req.userAdministrator);
});

const getAllEmployee=asyncHandler(async(req,res)=>{
        const Employess=await EmployeeReg.find()

        res.status(200).json(Employess)
})

const updatePasswordAndConfirmPassword = asyncHandler(async (req, res) => {
    try {
      const employee = await EmployeeReg.findOne({ employeeId: req.params.employeeId });
  
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      const { password, confirmPassword, ...updateData } = req.body;
  
      // Hash and update password if provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        employee.password = hashedPassword;
      }
  
      // Hash and update confirmPassword if provided
      if (confirmPassword) {
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
        employee.confirmPassword = hashedConfirmPassword;
      }
  
      // Update other fields if provided
      for (let key in updateData) {
        employee[key] = updateData[key];
      }
  
      // Save the updated employee
      const updatedEmployee = await employee.save();
      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error("Error updating Employee Registration:", error);
      res.status(500).json({ error: "An error occurred while updating the Employee Registration" });
    }
  });
  


module.exports = { registerUser, loginUser, currentUser ,getAllEmployee ,updatePasswordAndConfirmPassword}