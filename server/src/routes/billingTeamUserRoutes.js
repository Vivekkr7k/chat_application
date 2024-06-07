const express = require("express");
const router = express.Router();
const {
  billingTeamRegistration,
  billingTeamLogin,
} = require("../controllers/BillingTeamUserController");

router
  .post("/register", billingTeamRegistration)
  .post("/login", billingTeamLogin);

module.exports = router;
