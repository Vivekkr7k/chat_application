const express = require("express");

const router = express.Router();
const {
  createMessage,
  getMessagesEmp,
  getAdminMessages,
} = require("../controllers/empAdminSenderController.js");

const { upload } = require("../middleware/multer.middlewear.js");
// Adjust the path as necessary
const result = upload.fields([
  { name: "image" },
  { name: "document" },
  { name: "video" },
]);

// Create message
router.post("/createMessage", result, createMessage);

// Get messages between two users
router.get("/getmessages/:userId1/:userId2", getMessagesEmp);

// Get messages between two users
router.get("/getadminmessages/:userId1/:userId2", getAdminMessages);

module.exports = router;
