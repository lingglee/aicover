import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";

export default function MainPage() {
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
        
        {/* Right Side: Image */}
        <div className="flex-1 flex flex-col items-center">
          <img src="/vacabulary.png" alt="Learning Image" className="w-full max-w-sm rounded-lg mb-6" />
        </div>
      </div>
    </div>
  );
}
