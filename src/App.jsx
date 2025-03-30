import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoSummarizer from "./pages/VideoSummarizer";
import AudioSummarizer from "./pages/AudioSummarizer";
import PdfSummarizer from "./pages/PdfSummarizer";
import QAPlace from "./pages/QAPlace";
import Carousel from "./components/Carousel";
import ClickSpark from "./blocks/Animations/ClickSpark/ClickSpark";
import SplashCursor from "./blocks/Animations/SplashCursor/SplashCursor";
import SummaryViewer from "./pages/SummaryViewer";
import BottomNavBar from "./components/BottomNavBar";
import LiquidChrome from "./blocks/Backgrounds/LiquidChrome/LiquidChrome";
import Hyperspeed from "./blocks/Backgrounds/Hyperspeed/Hyperspeed";
import Iridescence from "./blocks/Backgrounds/Iridescence/Iridescence";
import Threads from "./blocks/Backgrounds/Threads/Threads";

import "./App.css";

export default function App() {
  return (
    <Router>
      {/* Background Layer */}
      <SplashCursor />

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
            <Route path="/summary" element={<SummaryViewer />} />
          </Routes>

          <BottomNavBar />
        </div>

        {/* Background Animation */}
      </ClickSpark>
    </Router>
  );
}
