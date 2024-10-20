const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
  email: String,
  image: Buffer,
  contentType: String,
  geminiUri: String, // New field to store Gemini URI
});

const User = mongoose.model("User", userSchema);

// Google AI setup
const fileManager = new GoogleAIFileManager('process.env.API_KEY');
const genAI = new GoogleGenerativeAI('process.env.API_KEY');

// Route to handle file upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const { email } = req.body;
    const image = req.file;

    if (!email || !image) {
      return res.status(400).send("Email and image are required");
    }

    // Create a new user with the uploaded image
    const newUser = new User({
      email,
      image: image.buffer,
      contentType: image.mimetype,
    });

    await newUser.save();

    // Create a temporary file path
    const tempFilePath = path.join(__dirname, "uploads", `${Date.now()}-${image.originalname}`);
    
    // Write the image buffer to the temporary file
    fs.writeFileSync(tempFilePath, image.buffer);

    // Upload to Gemini
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: image.mimetype,
      displayName: `${email}-image`,
    });

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri} `);

    // Store Gemini URI in the user record
    newUser.geminiUri = uploadResult.file.uri;
    await newUser.save();

    // Generate content using the uploaded image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Tell me how many pepsi cans are in this image. And give me examples of a sustainable project I can make with them.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    console.log(JSON.stringify(result, null, 2))

    // Clean up the temporary file after upload
    fs.unlinkSync(tempFilePath); // Remove the temporary file

    res.status(200).json({
      message: "Image uploaded successfully!",
      geminiResponse: result.response.text(),
      geminiUri: uploadResult.file.uri,
    });
  } catch (error) {
    console.error("Error during image upload or generation:", error);
    res.status(500).send("Error uploading image");
  }
});

// Start server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
