const express = require("express");
const connectDb = require("./src/config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
// const chat=require("../model/chatModel")
const liveChat=require("../server/src/model/liveChatModel")
const EmployeeRegistration = require('../server/src/model/employeeRegModel'); 

connectDb(); // Call the function to connect to the database

const app = express();

app.use(cors()); // Allow Cross-Origin Resource Sharing (CORS)

const port = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON bodies of incoming requests

// Define Mongoose Schema for the chat
const chatSchema = new mongoose.Schema({
    group: String, // Group name
    type: String,
    grade: String, // New field for grade
    messages: [{ employeeId: String, message: String }] // Array containing employeeId and its message
  },{timestamps:true});

// Create Mongoose Model based on the schema
 const ChatModel = mongoose.model("Chat", chatSchema);

// API endpoint to fetch chat messages for a specific group
app.get("/api/messages", async (req, res) => {
    try {
        const groupName = req.query.group; // Get the group name from the query parameter
        const grade = req.query.grade; // Get the grade from the query parameter

        let messages;
        if (groupName || grade) {
            // Fetch messages only for the specified group and grade
            messages = await ChatModel.findOne({ group: groupName, grade: grade });
        } else {
            // Fetch all messages if no group name is provided
            messages = await ChatModel.find();
        }

        if (!messages) {
            return res.status(404).json({ error: 'Messages not found for the specified group' });
        }

        // Format the messages
        const formattedMessages = {
            group: messages.group,
            messages: messages.messages
        };
       
        res.json(formattedMessages); // Send the messages as JSON response
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send 500 status code in case of error
    }
});

// API endpoint to create a new group
app.post("/api/groups", async (req, res) => {
    try {
        const { groupName, grade } = req.body; // Extract group name and grade from the request body

        // Check if the group name and grade are provided
        if (!groupName || !grade) {
            return res.status(400).json({ error: 'Group name and grade are required' });
        }

        // Check if the group with the same name and grade already exists
        let existingGroup = await ChatModel.findOne({ group: groupName, grade: grade });
        if (existingGroup) {
            return res.status(400).json({ error: `Group with name "${groupName}" and grade "${grade}" already exists` });
        }

        // Create a new group with the provided group name and grade
        const newGroup = new ChatModel({ group: groupName, grade: grade, messages: [] });

        // Save the new group to the database
        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send 500 status code in case of error
    }
});


// API endpoint to send a new message
app.post("/api/messages", async (req, res) => {
    try {
        const { employeeId, message, group, grade } = req.body; // Extract message details from the request body

        // Find the chat room by group name and grade
        let chatRoom = await ChatModel.findOne({ group, grade });

        // If the chat room doesn't exist, create a new one
        if (!chatRoom) {
            return res.status(400).json({ error: `Chat room with group "${group}" and grade "${grade}" does not exist` });
        }
        
        // Add the new message to the chat room
        chatRoom.messages.push({ employeeId, message });


          // Create a new liveChat instance
          const liveChats = new liveChat({
            group: chatRoom.group,
            grade: chatRoom.grade,
            employeeId: employeeId,
            messages: message
        });

        await liveChats.save();

        // Save the updated chat room
        await chatRoom.save();

        res.status(201).json({ message: 'Message sent successfully' ,liveChat:liveChats });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send 500 status code in case of error
    }
});


// API endpoint to delete a group by group name and grade
app.delete('/api/groups/:groupName/:grade', async (req, res) => {
    const { groupName, grade } = req.params;
    try {
      // Find and delete the group
      const result = await ChatModel.deleteOne({ group: groupName, grade: grade });
      if (result.deletedCount === 1) {
        res.json({ message: 'Group deleted successfully' });
      } else {
        res.status(404).json({ error: 'Group not found' });
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get("/api/groups", async (req, res) => {
    try {
        const groups = await ChatModel.aggregate([
            {
                $group: {
                    _id: { group: "$group", grade: "$grade" },
                    group: { $first: "$group" },
                    grade: { $first: "$grade" }
                }
            },
            {
                $project: {
                    _id: 0,
                    group: 1,
                    grade: 1
                }
            }
        ]);
        res.json(groups); // Send the distinct group names and grades as JSON response
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send 500 status code in case of error
    }
});


app.get('/api/employeeDetails/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await EmployeeRegistration.findOne({ employeeId });
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: "Employee details not found" });
        }
    } catch (error) {
        console.error('Error fetching employee details:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch messages based on group and grade
app.get('/api/Emessages', async (req, res) => {
    let { teamName, grade } = req.query;
    console.log('Received query:', teamName, grade);
    try {
        teamName = teamName.trim().toLowerCase();
        grade = grade.trim().toLowerCase();
        console.log('Formatted query:', teamName, grade);

        const result = await ChatModel.findOne({ 
            group: { $regex: new RegExp("^" + teamName + "$", "i") },
            grade: { $regex: new RegExp("^" + grade + "$", "i") }
        });

        console.log('Query result:', result);
        res.json(result ? result.messages : []);
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/messages/last-24-hours', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: today,
                        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            }
        ];

        const messages = await liveChat.aggregate(pipeline);
        
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Error to getting the todays data from lib=veChats' });
    }
});








// Mounting routes for admin and employee registration
app.use("/api/adminRegistration", require("./src/routes/adminRegRoutes"));
app.use("/api/employeeRegistration", require("./src/routes/employeeRegRoutes"));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port no ${port}`);
});
