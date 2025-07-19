import React from "react";
import { motion } from "framer-motion";

import TypewriterText from "./TypewriterText";
import { AppWrapp } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const words = ["Software_Engineer", "IT_Technician", "Web_Developer"];

const Header = () => {
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span role="img" aria-label="wave">
              👋
            </span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Pierre</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <TypewriterText words={words} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="app__header-img"
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
        <div className="circle-container">
          <img src={images.profile} alt="profile" className="profile-img" />

          <motion.svg
            className="profile__circle"
            viewBox="0 0 506 506"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="253"
              cy="253"
              r="220"
              stroke="#116466"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{
                strokeDasharray: "24 10 0 0",
                rotate: 0,
              }}
              animate={{
                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                transform: "rotate(0deg)",
                transformOrigin: "253px 253px",
                animation: "rotateInf 20s linear infinite",
              }}
            />
          </motion.svg>
        </div>
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.ittechnician, images.programmer, images.appdevelopment].map(
          (circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle} alt="profile_tag" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default AppWrapp(Header, "home");
