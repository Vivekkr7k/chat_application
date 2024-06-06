// controllers/messageController.js
const MessageRes = require("../model/EmpAdminSenderModel.js");
const { use } = require("../routes/messageRoutes.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { ObjectId } = require("mongodb");

const createMessage = async (req, res) => {
  const { sender, recipient, text } = req.body;

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
        return res
          .status(400)
          .json({ error: `Image file not found at path: ${imageLocalPath}` });
      }
      const imageUploadResult = await uploadOnCloudinary(imageLocalPath);
      if (!imageUploadResult || !imageUploadResult.url) {
        console.error(
          "Image upload failed:",
          imageUploadResult?.error || "Unknown error"
        );
        return res
          .status(400)
          .json({ error: "Image upload failed. Please try again." });
      }
      content.image = imageUploadResult.url;
    }

    if (hasDocument) {
      const documentLocalPath = req.files.document[0].path;
      if (!fs.existsSync(documentLocalPath)) {
        console.error(
          `Document file does not exist at path: ${documentLocalPath}`
        );
        return res.status(400).json({
          error: `Document file not found at path: ${documentLocalPath}`,
        });
      }
      const documentUploadResult = await uploadOnCloudinary(documentLocalPath);
      if (!documentUploadResult || !documentUploadResult.url) {
        console.error(
          "Document upload failed:",
          documentUploadResult?.error || "Unknown error"
        );
        return res
          .status(400)
          .json({ error: "Document upload failed. Please try again." });
      }
      content.document = documentUploadResult.url;
    }

    if (hasVideo) {
      const videoLocalPath = req.files.video[0].path;
      if (!fs.existsSync(videoLocalPath)) {
        console.error(`Video file does not exist at path: ${videoLocalPath}`);
        return res
          .status(400)
          .json({ error: `Video file not found at path: ${videoLocalPath}` });
      }
      const videoUploadResult = await uploadOnCloudinary(videoLocalPath);
      if (!videoUploadResult || !videoUploadResult.url) {
        console.error(
          "Video upload failed:",
          videoUploadResult?.error || "Unknown error"
        );
        return res
          .status(400)
          .json({ error: "Video upload failed. Please try again." });
      }
      content.video = videoUploadResult.url;
    }

    const message = new MessageRes({
      sender,
      recipient,
      content,
    });

    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMessagesEmp = async (req, res) => {
  const { userId1, userId2 } = req.params;

  if (!ObjectId.isValid(userId1) || !ObjectId.isValid(userId2)) {
    return res.status(400).json({ message: "Invalid user IDs" });
  }

  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 minute in milliseconds

    const messages = await MessageRes.find({
      $or: [
        {
          sender: userId1,
          recipient: userId2,
          createdAt: { $gte: oneMinuteAgo },
        },
        {
          sender: userId2,
          recipient: userId1,
          createdAt: { $gte: oneMinuteAgo },
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;

  console.log(userId1, userId2);

  if (!ObjectId.isValid(userId1) || !ObjectId.isValid(userId2)) {
    return res.status(400).json({ message: "Invalid user ids" });
  }

  try {
    const messages = await MessageRes.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 },
      ],
    }).sort({ createdAt: 1 });

    console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllEmployee= async(req,res)=>{

  try {
    const user = await MessageRes.find();
    if(!user){
      res.status(400).json({ message: error.message|| "user is not exists" });
    }

    res.status(200).json(user,{message:"use fetch sucessfully",suceess:true});
    
  } catch (error) {
    res.status(400).json({ message: error.message });
    
  }

}
const getAllEmployeeById= async(req,res)=>{
 const {id} = req.params
  try {
    const user = await MessageRes.findById({_id:id});
    if(!user){
      res.status(400).json({ message: error.message|| "user is not exists" });
    }

    res.status(200).json(user,{message:"use fetch sucessfully",suceess:true});
    
  } catch (error) {
    res.status(400).json({ message: error.message });
    
  }

}

module.exports = { createMessage, getMessagesEmp, getAdminMessages,getAllEmployee,getAllEmployeeById };
