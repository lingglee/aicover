"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function TedTalkPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const transcript = [
    "Welcome to the TED Talk.",
    "In this talk, we will explore the wonders of science.",
    "Our journey begins with a simple question.",
    // Add the rest of the transcript sentences here...
  ];

  useEffect(() => {
    if (isPlaying && currentSentence < transcript.length) {
      const utterance = new SpeechSynthesisUtterance(transcript[currentSentence]);
      utteranceRef.current = utterance;

      utterance.onboundary = (event) => {
        const charIndex = event.charIndex;
        const textLength = transcript[currentSentence].length;
        setProgress((charIndex / textLength) * 100);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setProgress(0);
    }
  }, [isPlaying, currentSentence]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSentence = () => {
    if (currentSentence < transcript.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-8 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-6xl">
          Daily Recommendation
        </h1>
      </div>
      <div className="mx-auto mt-16 max-w-4xl">
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/y8NtMZ7VGmU?rel=0&autoplay="
            title="TED Talk video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl text-center text-3xl font-bold leading-8 text-primary">
          Intensive Listening
        </h2>
        <div className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <div className="h-1.5 bg-gray-300 absolute bottom-0 left-0 w-full">
              <div
                className="h-1.5 bg-indigo-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-lg text-gray-900">
              {transcript[currentSentence]}
            </p>
            <p className="mt-2 text-sm text-gray-500">{`${currentSentence + 1}/${transcript.length}`}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <>
                  <PauseIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Play
                </>
              )}
            </Button>
            <Button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md"
              onClick={handleNextSentence}
            >
              Next Sentence
              <ChevronRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
