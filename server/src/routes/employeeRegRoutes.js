const express = require("express");
const router = express.Router();
const {registerEmployee,loginUser} = require("../controllers/employeeRegController");
// const validateToken = require("../middleware/vaildateTokenHandler");
// const validateToken = require("../middleware/vaildateTokenHandler");
// router.use(validateToken);

// Register
router.post("/register", registerEmployee);


router.post("/Login", loginUser);


  module.exports = router