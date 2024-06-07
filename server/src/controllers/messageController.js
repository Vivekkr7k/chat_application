const Message = require("../model/messageModel");
const { ObjectId } = require("mongoose").Types;

// Create a new message
const createMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const message = new Message({ sender, recipient, content });
    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get messages between two users

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
};
