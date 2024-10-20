'use client';
import Image from "next/image";
import Link from 'next/link';
import BubblyButton from '../components/BubblyButton';


export default function Home() {
  const handleGetStarted = () => {
    // Navigate to the getstarted page
    window.location.href = '/getstarted';
  };

  return (
    <div className="bg-gradient-to-br from-green-700 to-black"> 
      <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-medium">PepsiCo Sustainability Challenge</h1>
        </div>

        <div className="h-32 md:h-40"></div>

        <div className="flex items-center bg-transparent">
          <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
            Show us what you can create using America's favorite drink!
          </p>
          <Image
            src="/pepsi-png-42984.png"
            width={400} // Adjust width as needed
            height={100} // Adjust height as needed
            alt="Pepsi planter"
            className="rounded-lg ml-4" // Add margin left for spacing
          />
        </div>

        <div className="h-10"></div>
        <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
          PepsiCo has been fueling American creativity for years, we're asking you to give us a little of that 
          creativity in the form of Sustainable fun!
        </p>

        <div className="h-32 md:h-40"></div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
              How it Works
            </p>
            <h2 className="text-4xl font-bold">It starts with a picture...</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
              After uploading a picture of your PepsiCo product, it will undergo analysis using the Google Gemini API. 
              Gemini will then issue you a challenge... 
              A challenge to make something new out of something old! Using the prompt, Gemini will create its own rendition as well, which 
              you can use as inspiration in your creation!
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-green-700">

              {/* Section for Gemini picture examples */}
              {/* Picture 1 */}
              <div>
                <p className="font-semibold text-gray-400">Gemini's Vision</p>
                <div className="h-4">
                  <Image
                    src="/pepsiplanter.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="rounded-xl mt-8"
                  />
                  <h1 className="text-xl mt-4">Gemini thought of a sustainable planter solution!</h1>
                </div>
                <p className="font-serif text-gray-400"></p>
              </div>

              {/* Picture 2 */}
              <div>
                <p className="font-semibold text-gray-400">Your Creation!</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400"></p>
              </div>

            </div>
          </div>
          <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-red-400 to-blue-700 h-96"></div>
          </div>
        </div>

        <div className="mt-20">
            <BubblyButton 
              text="Get Started" 
              onClick={handleGetStarted} 
              color="#ffffff" 
              bgColor="#22c55e"  // This is a green color similar to bg-green-500
            />
          </div>

        <div className="flex justify-center pt-12 pb-8 text-gray-400">
          © 2024 All rights reserved
        </div>
      </div>
    </div>
  );
}
