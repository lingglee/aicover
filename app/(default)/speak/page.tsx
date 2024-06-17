"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, MicrophoneIcon, StopIcon } from "@heroicons/react/20/solid";

interface Recording {
  id: number;
  user: string;
  url: string;
}

export default function TedTalkPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Fetch existing recordings
    // Replace with your actual fetch code
    setRecordings([
      { id: 1, user: "User 1", url: "/recordings/user1.mp3" },
      { id: 2, user: "User 2", url: "/recordings/user2.mp3" },
    ]);
  }, []);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
          audioChunksRef.current = [];
        };
      });
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleUploadRecording = () => {
    // Upload the recording to the server
    // Replace with your actual upload code
    if (audioUrl) {
      const newRecording: Recording = { id: recordings.length + 1, user: "Current User", url: audioUrl };
      setRecordings([...recordings, newRecording]);
      setAudioUrl(null);
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-8 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-6xl">
          今日推荐
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A new study finds that people with the highest intakes of xylitol have nearly twice the risk of heart attack, middle-income and death than other groups. Xylitol is a low-calorie sweetener used in many low-sugar foods and consumer products, including sugar and ointments.
        </p>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center">达人配音</h2>
        <ul className="mt-4 space-y-4">
          {recordings.map((recording) => (
            <li key={recording.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <span>{recording.user}</span>
              <audio controls src={recording.url} className="w-1/2"></audio>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center">录音</h2>
        <div className="flex justify-center mt-4">
          {isRecording ? (
            <Button
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={handleStopRecording}
            >
              <StopIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              停止
            </Button>
          ) : (
            <Button
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
              onClick={handleStartRecording}
            >
              <MicrophoneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              录音
            </Button>
          )}
        </div>
        {audioUrl && (
          <div className="mt-4 flex justify-center">
            <audio controls src={audioUrl} className="w-1/2"></audio>
            <Button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleUploadRecording}
            >
              上传
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
