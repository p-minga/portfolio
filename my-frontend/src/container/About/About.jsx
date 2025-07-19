import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { AppWrapp, MotionWrap } from '../../wrapper';
import './About.scss';


const About = () => {
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    axios.get('https://www.pierreminga.com/backend/api/getUsers.php?table=Companies')
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));

  // useEffect(() => {
  //   axios.get('http://localhost:3001/companies') 
  //     .then(res => setCompanies(res.data))
  //     .catch(err => console.error(err));
   }, []);
  return (
    <>
    <h2 className="head-text">I Develop <span>Innovative Software & IT</span> <br />for <span>Future-Ready Success</span></h2>
      <div className="app__profiles">
        {companies.map((company, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={company.title + index}
          >
            <img src={company.imgUrl} alt={company.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{company.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{company.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrapp(
  MotionWrap(About, 'app__about'), 
  'about',
  'app__whitebg'

);
