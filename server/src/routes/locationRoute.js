const express = require("express");
const router = express.Router();
const { saveLocation } = require("../controllers/locationController");

// Save location
router.post("/location", saveLocation);

module.exports = router;
