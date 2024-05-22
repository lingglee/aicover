"use client";

import { useState } from "react";
import { nanoid } from "nanoid";

interface Word {
  id: string;
  word: string;
  category: string;
  definition: string;
  example: string;
  createdAt: string;
  status: "new" | "in-progress" | "learned";
}

const initialWords: Word[] = [
  { id: nanoid(), word: "aberration", category: "noun", definition: "A deviation from the norm.", example: "His angry outburst was an aberration.", createdAt: "2023-05-21", status: "new" },
  { id: nanoid(), word: "cognizant", category: "adjective", definition: "Having knowledge or being aware of.", example: "She was cognizant of the potential risks.", createdAt: "2023-05-21", status: "in-progress" },
  { id: nanoid(), word: "elucidate", category: "verb", definition: "To make something clear; explain.", example: "The professor elucidated the complex concept.", createdAt: "2023-05-21", status: "learned" },
  { id: nanoid(), word: "aberration", category: "noun", definition: "A deviation from the norm.", example: "His angry outburst was an aberration.", createdAt: "2023-05-21", status: "new" },
  { id: nanoid(), word: "cognizant", category: "adjective", definition: "Having knowledge or being aware of.", example: "She was cognizant of the potential risks.", createdAt: "2023-05-21", status: "in-progress" },
  { id: nanoid(), word: "elucidate", category: "verb", definition: "To make something clear; explain.", example: "The professor elucidated the complex concept.", createdAt: "2023-05-21", status: "learned" },
  { id: nanoid(), word: "aberration", category: "noun", definition: "A deviation from the norm.", example: "His angry outburst was an aberration.", createdAt: "2023-05-21", status: "new" },
  { id: nanoid(), word: "cognizant", category: "adjective", definition: "Having knowledge or being aware of.", example: "She was cognizant of the potential risks.", createdAt: "2023-05-21", status: "in-progress" },
  { id: nanoid(), word: "elucidate", category: "verb", definition: "To make something clear; explain.", example: "The professor elucidated the complex concept.", createdAt: "2023-05-21", status: "learned" },
  { id: nanoid(), word: "aberration", category: "noun", definition: "A deviation from the norm.", example: "His angry outburst was an aberration.", createdAt: "2023-05-21", status: "new" },
  { id: nanoid(), word: "cognizant", category: "adjective", definition: "Having knowledge or being aware of.", example: "She was cognizant of the potential risks.", createdAt: "2023-05-21", status: "in-progress" },
  { id: nanoid(), word: "elucidate", category: "verb", definition: "To make something clear; explain.", example: "The professor elucidated the complex concept.", createdAt: "2023-05-21", status: "learned" },
  // Add more words as needed
];

const WordCards: React.FC = () => {
  const [words, setWords] = useState<Word[]>(initialWords);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const wordsPerPage = 10;
  const totalPages = Math.ceil(words.length / wordsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePronunciation = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  const currentWords = words.slice(
    (currentPage - 1) * wordsPerPage,
    currentPage * wordsPerPage
  );

  return (
    <section className="mx-auto max-w-7xl px-5 my-16">
      <h1 className="text-3xl font-bold text-center mb-6">Today's Plan</h1>
      <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentWords.map((wordObj) => (
          <div
            key={wordObj.id}
            className="relative p-4 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-blue-600">{wordObj.word}</h3>
              <button
                className="ml-2"
                onClick={() => handlePronunciation(wordObj.word)}
                aria-label="Play pronunciation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5l7 7-7 7V5z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500">{wordObj.category}</p>
            <p className="text-sm text-gray-700 mb-2">{wordObj.definition}</p>
            <p className="text-sm text-gray-500 italic mb-2">"{wordObj.example}"</p>
            <div className="flex items-center mb-2">
              <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2">
                Added on {wordObj.createdAt}
              </span>
              <span
                className={`inline-block text-xs px-2 py-1 rounded ${
                  wordObj.status === "new"
                    ? "bg-green-200 text-green-700"
                    : wordObj.status === "in-progress"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-blue-200 text-blue-700"
                }`}
              >
                {wordObj.status.replace("-", " ").toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default WordCards;
