import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoSummarizer from "./pages/VideoSummarizer";
import AudioSummarizer from "./pages/AudioSummarizer";
import PdfSummarizer from "./pages/PdfSummarizer";
import QAPlace from "./pages/QAPlace";
import Carousel from "./components/Carousel";
import ClickSpark from "./blocks/Animations/ClickSpark/ClickSpark";
import SplashCursor from "./blocks/Animations/SplashCursor/SplashCursor";
import LiquidChrome from "./blocks/Backgrounds/LiquidChrome/LiquidChrome";
import Hyperspeed from "./blocks/Backgrounds/Hyperspeed/Hyperspeed";
import Iridescence from "./blocks/Backgrounds/Iridescence/Iridescence";
import Threads from "./blocks/Backgrounds/Threads/Threads";

// the component will fill the height/width of its parent container, edit the CSS to change this
// the options below are the default values

import "./App.css";

export default function App() {
  return (
    <Router>
      {/* Background Layer */}
      {/* <SplashCursor /> */}

      {/* Foreground Content */}
      <ClickSpark
        sparkColor="#2b7fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Carousel />

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<VideoSummarizer />} />
            <Route path="/audio" element={<AudioSummarizer />} />
            <Route path="/pdf" element={<PdfSummarizer />} />
            <Route path="/qa" element={<QAPlace />} />
          </Routes>
        </div>
        {/* <div className="fixed inset-0 -z-10 w-full h-full">
          <Threads amplitude={1} distance={1.1} enableMouseInteraction={true} />
        </div> */}
      </ClickSpark>
    </Router>
  );
}
