import React from "react";
import BottomNavBar from "../components/BottomNavBar";
import TrueFocus from "../blocks/TextAnimations/TrueFocus/TrueFocus";
import Magnet from "../blocks/Animations/Magnet/Magnet";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

let text = "Isn't this so cool !";
const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-px-100 p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          <TrueFocus
            sentence="Welcome to the Summify AI Assistant"
            manualMode={false}
            blurAmount={5}
            borderColor="black"
            animationDuration={0.5}
            pauseBetweenAnimations={0.5}
          />
        </h1>
        <div className="text-xl text-gray-700 mb-6"></div>
        <div className="animation-container bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-lg shadow-lg mb-6">
          <div className="text-white text-lg">
            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <p>Experience the future of learning with AI assistance!</p>
            </Magnet>
          </div>
        </div>
        <div className="about-container mb-6 text-center flex justify-between">
          <div className="about-me w-1/2 p-4">
            <h2 className="text-2xl font-bold text-blue-500">About Me</h2>
            <p className="text-lg text-gray-600 text-justify">
              Hi, I am{" "}
              <a
                className="font-semibold text-sky-600 hover:text-sky-800"
                href="https://udhayaboopathi.me/"
                target="_blank"
              >
                UDHAYBOOPATHI V
              </a>
              , the creator of this Summify AI Assistant. This tool is designed
              to help students with their learning journey, providing
              personalized assistance and making education more accessible and
              efficient. I am passionate about technology and education, and I
              believe that AI can revolutionize the way we learn. Through
              Summify, I aim to empower students by offering them a tool that
              adapts to their individual learning styles and needs, helping them
              achieve academic success.
            </p>
          </div>
          <div className="about-ai w-1/2 p-4">
            <h2 className="text-2xl font-bold text-blue-500">About AI</h2>
            <p className="text-lg text-gray-600 text-justify">
              Summify AI Assistant uses advanced machine learning algorithms to
              provide accurate and insightful assistance to students. With a
              focus on personalization, it adapts to each student's unique
              needs, offering tailored learning experiences, answering
              questions, and helping to simplify complex topics.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 flex flex-col items-center justify-center pb-20"></div>
      </div>
    </>
  );
};

export default Home;
