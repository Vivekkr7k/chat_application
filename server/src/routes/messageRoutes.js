const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController.js");
const { upload } = require("../middleware/multer.middlewear.js");
// Adjust the path as necessary
const result = upload.fields([
  { name: "image" },
  { name: "document" },
  { name: "video" },
]);
router.post("/postmessages", result, createMessage);
router.get("/getmessages/:userId1/:userId2", getMessages);

router.delete("/delmessages/:id", deleteMessage);

module.exports = router;