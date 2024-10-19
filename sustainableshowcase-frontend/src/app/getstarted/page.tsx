'use client'
import Image from "next/image";
import Link from 'next/link'
import { useState } from "react";

export default function page() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-black">
      <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-medium">PepsiCo Sustainability Challenge</h1>
        </div>

        <div className="h-10"></div>
        <h2 className="font-sans text-2xl font-bold text-gray-200">Upload Your Image</h2>
        <p className="font-serif text-xl text-gray-400 md:text-2xl mt-4">
          Follow these steps to upload your image and participate in the challenge:
        </p>

        <ol className="list-decimal list-inside font-serif text-gray-400 mt-6">
          <li>Select a photo of your PepsiCo product.</li>
          <li>Upload it using the form below.</li>
          <li>Wait for the analysis and receive your sustainability challenge!</li>
        </ol>

        <div className="h-10"></div>
        
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-gray-300"
          />
          {selectedImage && (
            <div className="mt-6">
              <Image src={selectedImage} alt="Uploaded Image" width={500} height={500} />
            </div>
          )}
        </div>

        <Link href="/getstarted">
          <button className="mt-10 p-4 bg-green-300 text-white font-semibold rounded-xl">
            Submit & Get Started
          </button>
        </Link>

        <div className="flex justify-center pt-12 pb-8 text-gray-400">
          © 2024 All rights reserved
        </div>
      </div>
    </div>
  );
}
