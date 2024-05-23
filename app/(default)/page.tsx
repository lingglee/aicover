"use client";

import { useState } from 'react';
import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";

export default function MainPage() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleVideoClick = () => {
    setIsVideoVisible(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center">
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center md:text-left md:mr-10 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Learn just the words you need.</h1>
          <p className="text-lg text-gray-700 mb-4">
            Did you know that with just a few hundred words, you can understand
            a significant portion of everyday English? Essential Vocabulary is here
            to guide you through the maze of the English language, streamlining your
            learning with short, impactful texts.
          </p>
          <div className="w-full max-w-lg mx-auto mb-8">
            <Input />
          </div>
        </div>
        
        {/* Right Side: Video with Preview Image */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-full max-w-md mb-6" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            {isVideoVisible ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/y8NtMZ7VGmU?rel=0&autoplay=1"
                title="TED Talk Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full">
                <img
                  src="https://img.youtube.com/vi/y8NtMZ7VGmU/hqdefault.jpg"
                  alt="Video Preview"
                  className="w-full h-full rounded-lg cursor-pointer"
                  onClick={handleVideoClick}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-6.012-3.507A1 1 0 007 8.507v6.986a1 1 0 001.74.757l6.012-3.507a1 1 0 000-1.744z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
