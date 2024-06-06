const Message = require("../model/messageModel.js");
const {ObjectId} =require("mongodb")
const fs = require('fs');
const { uploadOnCloudinary } = require('../utils/cloudinary.js');
const { log } = require("console");

const createMessage = async (req, res) => {
  const { sender, recipient, text } = req.body;

  console.log(recipient,sender, text);

  if (!sender || !recipient) {
    return res.status(400).json({ message: "Sender and recipient are required." });
  }

  console.log(text, sender, recipient);

  try {
    let content = { text };

    // Upload image if it exists
    const hasImage = req.files && req.files.image;
    const hasDocument = req.files && req.files.document;
    const hasVideo = req.files && req.files.video;

    if (hasImage) {
      const imageLocalPath = req.files.image[0].path;
      if (!fs.existsSync(imageLocalPath)) {
        console.error(`Image file does not exist at path: ${imageLocalPath}`);
        return res.status(400).json({ error: `Image file not found at path: ${imageLocalPath}` });
      }
      const imageUploadResult = await uploadOnCloudinary(imageLocalPath);
      if (!imageUploadResult || !imageUploadResult.url) {
        console.error("Image upload failed:", imageUploadResult?.error || "Unknown error");
        return res.status(400).json({ error: "Image upload failed. Please try again." });
      }
      content.image = imageUploadResult.url;
    }

    if (hasDocument) {
      const documentLocalPath = req.files.document[0].path;
      if (!fs.existsSync(documentLocalPath)) {
        console.error(`Document file does not exist at path: ${documentLocalPath}`);
        return res.status(400).json({ error: `Document file not found at path: ${documentLocalPath} `});
      }
      const documentUploadResult = await uploadOnCloudinary(documentLocalPath);
      if (!documentUploadResult || !documentUploadResult.url) {
        console.error("Document upload failed:", documentUploadResult?.error || "Unknown error");
        return res.status(400).json({ error: "Document upload failed. Please try again." });
      }
      content.document = documentUploadResult.url;
    }

    if (hasVideo) {
      const videoLocalPath = req.files.video[0].path;
      if (!fs.existsSync(videoLocalPath)) {
        console.error(`Video file does not exist at path: ${videoLocalPath}`);
        return res.status(400).json({ error:` Video file not found at path: ${videoLocalPath}` });
      }
      const videoUploadResult = await uploadOnCloudinary(videoLocalPath);
      if (!videoUploadResult || !videoUploadResult.url) {
        console.error("Video upload failed:", videoUploadResult?.error || "Unknown error");
        return res.status(400).json({ error: "Video upload failed. Please try again." });
      }
      content.video = videoUploadResult.url;
    }

    const message = new Message({
      sender,
      recipient,
      content,
    });

    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(400).json({ message: error.message });
  }
};







const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;

  if (!ObjectId.isValid(userId1) || !ObjectId.isValid(userId2)) {
    return res.status(400).json({ message: "Invalid user ids" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted", deletedMessage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
}