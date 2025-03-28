import React, { useState, useEffect } from "react";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
import logo from "../assets/logo.png";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Carousel = () => {
  const slides = [
    {
      imgSrc:
        "https://penguinui.s3.amazonaws.com/component-assets/carousel/default-slide-1.webp",
      imgAlt:
        "Vibrant abstract painting with swirling blue and light pink hues on a canvas.",
      title: "PDF Summarization",
      description:
        "Instantly extracts key insights from PDFs, making study materials concise and easy to grasp.",
      glowColor: "#00FFFF", // Cyan Blue
      bgGlow: "bg-cyan-400",
    },
    {
      imgSrc:
        "https://penguinui.s3.amazonaws.com/component-assets/carousel/default-slide-2.webp",
      imgAlt:
        "Vibrant abstract painting with swirling red, yellow, and pink hues on a canvas.",
      title: "Audio Summarization ",
      description:
        "Converts long audio lectures into short, clear summaries for quick learning",
      glowColor: "#FFA500", // Orange
      bgGlow: "bg-orange-400",
    },
    {
      imgSrc:
        "https://penguinui.s3.amazonaws.com/component-assets/carousel/default-slide-3.webp",
      imgAlt:
        "Vibrant abstract painting with swirling blue and purple hues on a canvas.",
      title: "YouTube Summarization",
      description:
        "Analyzes and summarizes YouTube videos, providing students with essential takeaways.",
      glowColor: "#FF007F", // Rose
      bgGlow: "bg-rose-400",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const previous = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const next = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Previous Button */}

      {/* Slides */}
      <div className="relative min-h-[50vh] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Title and Description */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 sm:px-16 py-12 text-center text-white">
              <div className=" relative flex items-center justify-center">
                {/* Background glow effect (changes per slide) */}
                <div
                  className={`absolute inset-0 ${slide.bgGlow} opacity-20 blur-3xl animate-pulse`}
                ></div>

                {/* Logo with glowing & floating animation (changes per slide) */}
                <img
                  src={logo}
                  className={`h-32 w-auto relative rounded-xl brightness-150 contrast-125 animate-float sm:h-70`}
                  style={{
                    filter: `drop-shadow(0px 0px 50px ${slide.glowColor})`,
                  }}
                  alt="Summify Logo"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold">
                <BlurText
                  text={slide.title}
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-xl sm:text-2xl mb-6"
                />
              </h3>
              <p className="text-xs sm:text-sm">{slide.description}</p>
            </div>
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.imgSrc}
              alt={slide.imgAlt}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
