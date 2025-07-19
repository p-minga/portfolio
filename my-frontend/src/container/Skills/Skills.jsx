import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import ReactTooltip from 'react-tooltip';


import { AppWrapp, MotionWrap } from '../../wrapper';
import axios from 'axios';
import './Skills.scss';

const Skills = () => {

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('https://www.pierreminga.com/backend/api/getUsers.php?table=Skills');
        setSkills(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    const fetchExperiences = async () => {
      try {
        const response = await axios.get('https://www.pierreminga.com/backend/api/getUsers.php?table=Experiences	');
        setExperiences(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSkills();
    fetchExperiences();
  }, []);

  // Group experiences by year
  const groupedExperiences = experiences.reduce((acc, experience) => {
    const { year } = experience;
    if (!acc[year]) {
      acc[year] = { year, experiences: [] };
    }
    acc[year].experiences.push(experience);
    return acc;
  }, {});
 
  const groupedArray = Object.values(groupedExperiences).sort((a, b) => b.year - a.year);

  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>  

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
        {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.icon} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          { groupedArray.map((group) => (
            <motion.div
              className="app__skills-exp-item"
              key={group.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{group.year}</p>
              </div>

              <motion.div className="app__skills-exp-works">
                {group.experiences.map((experience) => (
                  <React.Fragment key={experience.id}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={`exp-${experience.id}`}
                    >
                      <h4 className="bold-text">{`${experience.name}`}</h4>
                      <p className="p-text">{`${experience.company}`}</p>
                    </motion.div>
                    <ReactTooltip
                      id={`exp-${experience.id}`}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {experience.description || 'No description available'}
                    </ReactTooltip>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>  
    </>
  )
}

export default AppWrapp(
  MotionWrap(Skills, 'app__skills'), 
  'skills',
  'app__whitebg'

);