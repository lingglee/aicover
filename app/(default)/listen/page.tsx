"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, ArrowRightIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface MaskedWord {
  word: string;
  index: number;
  isVisible: boolean;
}

export default function TedTalkPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [maskedWords, setMaskedWords] = useState<MaskedWord[]>([]);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isRetryDisabled, setIsRetryDisabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/lifeifei.srt")
      .then((response) => response.text())
      .then((data) => {
        const parsedSubtitles = parseSRT(data);
        setSubtitles(parsedSubtitles);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  }, []);

  const parseSRT = (data: string): Subtitle[] => {
    const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n*$)/g;
    let match;
    const result: Subtitle[] = [];
    while ((match = regex.exec(data)) !== null) {
      result.push({
        start: parseTime(match[2]),
        end: parseTime(match[3]),
        text: match[4].replace(/\n/g, ' ')
      });
    }
    return result;
  };

  const parseTime = (time: string): number => {
    const [hours, minutes, seconds] = time.split(':');
    const [secs, millis] = seconds.split(',');
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(secs, 10) +
      parseInt(millis, 10) / 1000
    );
  };

  const getCurrentSubtitle = (): string => {
    if (subtitles[currentSubtitleIndex]) {
      return subtitles[currentSubtitleIndex].text;
    }
    return '';
  };

  const maskWords = (text: string): MaskedWord[] => {
    const words = text.split(' ');
    const totalWords = words.length;
    const numToMask = Math.floor(totalWords * 0.7); // 70% of the words
    const indicesToMask = new Set<number>();

    while (indicesToMask.size < numToMask) {
      const randomIndex = Math.floor(Math.random() * totalWords);
      indicesToMask.add(randomIndex);
    }

    return words.map((word, index) => ({
      word,
      index,
      isVisible: !indicesToMask.has(index),
    }));
  };

  useEffect(() => {
    if (isPlaying) {
      const currentSubtitle = getCurrentSubtitle();
      if (currentSubtitle) {
        setMaskedWords(maskWords(currentSubtitle));
      }
    }
  }, [isPlaying, currentSubtitleIndex, subtitles]);

  const toggleWordVisibility = (index: number) => {
    setMaskedWords((prev) =>
      prev.map((maskedWord) =>
        maskedWord.index === index ? { ...maskedWord, isVisible: true } : maskedWord
      )
    );
  };

  const renderMaskedSubtitle = (text: string): JSX.Element => {
    return (
      <>
        {text.split(' ').map((word, index) => {
          const maskedWord = maskedWords.find((w) => w.index === index);
          if (maskedWord && !maskedWord.isVisible) {
            return (
              <span
                key={index}
                onClick={() => toggleWordVisibility(index)}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-green-200 text-white px-2 rounded-md mx-1 inline-block"
                style={{ width: `${word.length}ch` }}
              >
                &nbsp;
              </span>
            );
          }
          return <span key={index} className="text-gray-900 mx-1">{word}</span>;
        })}
      </>
    );
  };

  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    playCurrentSubtitle();
    setIsPlaying(true);
  };

  const playCurrentSubtitle = () => {
    const audio = audioRef.current;
    if (audio && subtitles[currentSubtitleIndex]) {
      const { start, end } = subtitles[currentSubtitleIndex];
      audio.currentTime = start;
      audio.play();
      const duration = (end - start) * 1000;
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, duration);
    }
  };

  const handleNextSubtitle = () => {
    setIsNextDisabled(true); // Disable the Next button
    const nextIndex = currentSubtitleIndex + 1;
    if (nextIndex < subtitles.length) {
      setCurrentSubtitleIndex(nextIndex);
      playNextSubtitle(nextIndex);
    }
    setTimeout(() => {
      setIsNextDisabled(false); // Re-enable the Next button after a delay
    }, 500);
  };

  const playNextSubtitle = (index: number) => {
    const audio = audioRef.current;
    if (audio && subtitles[index]) {
      const { start, end } = subtitles[index];
      audio.currentTime = start;
      audio.play();
      const duration = (end - start) * 1000;
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, duration);
    }
  };

  const handleReplay = () => {
    setIsRetryDisabled(true); // Disable the Retry button
    playCurrentSubtitle();
    setTimeout(() => {
      setIsRetryDisabled(false); // Re-enable the Retry button after a delay
    }, 500);
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
                style={{ width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%` }}
              ></div>
            </div>
            <p className="text-lg text-gray-900">{renderMaskedSubtitle(getCurrentSubtitle())}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Button
              className={`flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={hasStarted ? handleNextSubtitle : handlePlayPause}
              disabled={isNextDisabled}
            >
              {hasStarted ? (
                <>
                  <ArrowRightIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Next
                </>
              ) : (
                <>
                  <PlayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Play
                </>
              )}
            </Button>
            <Button
              className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-md ${isRetryDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleReplay}
              disabled={isRetryDisabled}
            >
              <ArrowUturnLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Retry
            </Button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="/lifeifei.mp3"></audio>
    </div>
  );
}
