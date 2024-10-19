const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB schema for User and image
const userSchema = new mongoose.Schema({
  username: String,
  image: Buffer,
  contentType: String
});

const User = mongoose.model("User", userSchema);

// Route to handle file upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { username } = req.body;
    const image = req.file;

    if (!username || !image) {
      return res.status(400).send("Username and image are required");
    }

    // Create a new user with the uploaded image
    const newUser = new User({
      username,
      image: image.buffer,
      contentType: image.mimetype,
    });

    await newUser.save();

    res.status(200).send("Image uploaded successfully!");
  } catch (error) {
    res.status(500).send("Error uploading image");
  }
});

// Start server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
