'use client';
import Image from "next/image";
import { useState } from "react";
import BubblyButton from '../../components/BubblyButton';
import FileInputButton from '../../components/FileInputButton';
import ReactMarkdown from 'react-markdown';

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("garv5114@gmail.com"); // State to hold the email
  const [aiChallenge, setAiChallenge] = useState(""); // State to hold the AI challenge text
  const [isLoading, setIsLoading] = useState(false); // State to show loading while waiting for response
  const [userCreation, setUserCreation] = useState(null); // State to hold user's creation

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsLoading(true); // Set loading to true while waiting for the AI challenge

      // Create a form data object to send the file and email
      const formData = new FormData();
      formData.append("email", email); // Use the email from the state
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:5050/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          setAiChallenge(responseData.geminiResponse); // Set the AI challenge text
          console.log("Received AI response:", responseData.geminiResponse);
          setIsLoading(false); // Set loading to false after receiving the response
        } else {
          console.error("Image upload failed");
          setIsLoading(false); // Stop loading in case of error
        }
      } catch (error) {
        console.error("Error uploading image", error);
        setIsLoading(false); // Stop loading in case of error
      }
    }
  };

  const handleCreationUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserCreation(URL.createObjectURL(file)); // Set the user's creation for preview

      // Create a form data object to send the user's creation and email
      const formData = new FormData();
      formData.append("email", email); // Use the email from the state
      formData.append("image", file); // Add the creation file

      try {
        const response = await fetch("http://localhost:5050/upload-creation", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Creation uploaded successfully");
        } else {
          console.error("Creation upload failed");
        }
      } catch (error) {
        console.error("Error uploading creation", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-500">
      <div className="text-white container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-4xl font-medium">PepsiCo Sustainable Showcase</h1>
        </div>

        <div className="h-10"></div>
        <h2 className="font-sans text-2xl font-bold text-gray-200">Join the Movement</h2>
        <p className="font-serif text-4xl text-white font-semibold italic mt-4">
          Follow the steps below to upload your image and participate in the challenge:
        </p>

        <ol className="list-decimal list-inside font-serif text-white text-2xl mt-6 mb-6">
          <li>Enter your email, this will be used to display your creation on our global leaderboard!</li>
        </ol>

        <div className="h-10"></div>

        <div className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black mb-4 p-2 border rounded"
            required
          />

          <div className="list-decimal list-inside font-serif text-white text-2xl mt-6 text-left">
            2. Upload an image of your PepsiCo product and let AI give you a challenge!
          </div>

          <FileInputButton
            onChange={handleImageUpload}
            accept="image/*"
            required
            text="Upload Image"
            color="#fff"
            bgColor="#4CAF50"
          />
          {selectedImage && (
            <div className="mt-6">
              <Image src={selectedImage} alt="Uploaded Image" width={500} height={500} />
            </div>
          )}
        </div>

        <div className="list-decimal list-inside font-serif text-white text-2xl mt-6 text-left">
          3. Your AI Challenge will appear below, read it, dream it, and create it! Don't be afraid to let your personal creativity show!
        </div>

        {/* Display loading state or AI challenge */}
        <div className="text-white text-xl mt-4">
          {isLoading ? (
            <p>Loading AI Challenge...</p>
          ) : (
            aiChallenge && (
              <div className="bg-gray-800 p-4 rounded-md shadow-md mt-4 text-white">
                <ReactMarkdown>{aiChallenge}</ReactMarkdown>
              </div>
            )
          )}
        </div>

        {aiChallenge && (
          <>
            <div className="list-decimal list-inside font-serif text-white text-2xl mt-6 text-left">
              4. Now that you have your challenge... it's all you! Use Gemini as inspiration and create something awesome.
              Afterwards, upload it for the world to see! Gemini will assign your submission a score based on its rubric, and the world can show love as well!
            </div>

            <div className="flex flex-col items-center">
              <p className="text-white text-xl mb-4">Upload your creation:</p>
              <FileInputButton
                onChange={handleCreationUpload}
                accept="image/*"
                required
                text="Upload Image"
                color="#fff"
                bgColor="#4CAF50"
              />
            </div>

            {userCreation && (
              <div className="mt-6">
                <Image src={userCreation} alt="User's Creation" width={500} height={500} />
              </div>
            )}
          </>
        )}

        <div className="flex justify-center pt-12 pb-8 text-gray-400">
          © 2024 All rights reserved
        </div>
      </div>
    </div>
  );
}