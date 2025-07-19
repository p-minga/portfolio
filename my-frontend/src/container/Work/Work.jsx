import React, { useState, useEffect } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AppWrapp, MotionWrap } from "../../wrapper";
import axios from "axios";
import "./Work.scss";
import WorkSliderBtns from "./WorkSliderBtns";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterWork, setFilterWork] = useState([]);
  // const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const [worksRes, stackRes] = await Promise.all([
          axios.get(
            "https://www.pierreminga.com/backend/api/getUsers.php?table=works"
          ),
          axios.get(
            "https://www.pierreminga.com/backend/api/getUsers.php?table=work_stack"
          ),
        ]);

        const works = worksRes.data;
        const stack = stackRes.data;

        const enriched = works.map((work) => ({
          ...work,
          stack: stack
            .filter((s) => s.work_id === work.id)
            .map((s) => ({ name: s.tech_name })),
        }));

        setWorks(enriched);
        setFilterWork(enriched);
        setProject(enriched[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorks();
  }, []);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(works[currentIndex]);
  };

  return (
    <>
      <h2 className="head-text">
        My <span>Portfolio </span>
      </h2>

      {project && (
        <div className="section">
          <div className="container">
            <div className="content">
              <div className="text-box">
                <div className="project-num">{project.num}</div>
                <h2 className="project-title">{project.title}</h2>
                <p className="description">{project.description}</p>
                <ul className="project-stack">
                  {project.stack.map((item, i) => (
                    <li key={i} className="stack-item">
                      {item.name}
                      {i !== project.stack.length - 1 && ","}
                    </li>
                  ))}
                </ul>

                <div className="custom-border"></div>

                <div className="space-between">
                  <div className="project-button">
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip title="Live project" arrow enterDelay={100}>
                        <div className="tooltip-trigger">
                          <BsArrowUpRight className="icon" />
                        </div>
                      </Tooltip>
                    </a>
                  </div>

                  <div className="project-button">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip title="GitHub" arrow enterDelay={100}>
                        <div className="tooltip-trigger">
                          <BsGithub className="icon" />
                        </div>
                      </Tooltip>
                    </a>
                  </div>
                </div>
              </div>

              <div className="slider">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  onSlideChange={handleSlideChange}
                >
                  {works.map((proj, i) => (
                    <SwiperSlide key={i} className="custom-slide">
                      <div className="slide-content">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="project-img"
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                  <WorkSliderBtns
                    containerStyles="work-slider-btns"
                    btnStyles="work-slider-btn"
                  />
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppWrapp(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
