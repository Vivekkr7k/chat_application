const express = require("express");
const router = express.Router();
const {registerUser,loginUser,currentUser, getAllEmployee, updatePasswordAndConfirmPassword} = require("../controllers/adminRegController");
const validateToken = require("../middleware/vaildateTokenHandler");

// Register
router.post("/register", registerUser);

//Login
router.post("/login",loginUser);

router.get("/getAllEmployess" ,getAllEmployee)

router.patch("/updatePassword/:employeeId" , updatePasswordAndConfirmPassword)

    // Current user information
 router.get("/Current",validateToken, currentUser);

  module.exports = router