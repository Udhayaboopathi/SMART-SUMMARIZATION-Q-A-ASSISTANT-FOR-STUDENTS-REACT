import React from "react";
import { useNavigate } from "react-router-dom";
import Dock from "../blocks/Components/Dock/Dock";
import { TiHome } from "react-icons/ti";
import { FaFilePdf, FaYoutube, FaFileAudio } from "react-icons/fa6";
import { LiaQuestionSolid } from "react-icons/lia";
import { IoIosContact } from "react-icons/io";

const BottomNavBar = () => {
  const navigate = useNavigate();

  const iconStyle = {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 5px rgb(0, 47, 255)",
  };

  const items = [
    {
      icon: (
        <div style={iconStyle}>
          <TiHome size={24} />
        </div>
      ),
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: (
        <div style={iconStyle}>
          <FaFilePdf size={24} />
        </div>
      ),
      label: "PDF",
      onClick: () => navigate("/pdf"),
    },
    {
      icon: (
        <div style={iconStyle}>
          <FaYoutube size={24} />
        </div>
      ),
      label: "Video",
      onClick: () => navigate("/video"),
    },
    {
      icon: (
        <div style={iconStyle}>
          <FaFileAudio size={24} />
        </div>
      ),
      label: "Audio",
      onClick: () => navigate("/audio"),
    },
    {
      icon: (
        <div style={iconStyle}>
          <LiaQuestionSolid size={24} />
        </div>
      ),
      label: "Q&A",
      onClick: () => navigate("/qa"),
    },
    {
      icon: (
        <div style={iconStyle}>
          <IoIosContact size={24} />
        </div>
      ),
      label: "Contact Us",
      onClick: () => window.open("https://udhayaboopathi.me/", "_blank"),
    },
    {
      // History button added here
      icon: (
        <div style={iconStyle}>
          <TiHome size={24} />
        </div>
      ),
      label: "History",
      onClick: () => navigate("/summary"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 z-50 flex justify-center text-blue-500 items-center shadow-md pb-2 flex-wrap">
      <Dock items={items} />
    </div>
  );
};

export default BottomNavBar;
