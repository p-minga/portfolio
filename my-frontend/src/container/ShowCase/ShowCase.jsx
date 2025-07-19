import React from 'react'
import './ShowCase.scss';
// import {motion} from 'framer-motion';
// import React, { useState, useEffect } from 'react';

import { AppWrapp, MotionWrap } from '../../wrapper';

const words = ["Software_Engineer", "IT_Technician", "Web_Developer"];
const ShowCase = () => {

  return (
    <>
  <main id="container">
  <div id="terminal">
         
    <section id="terminal__bar">          
      <div id="bar__buttons">            
        <button className="bar__button" id="bar__button--exit">&#10005;</button>            
        <button className="bar__button">&#9472;</button>                
        <button className="bar__button">&#9723;</button>          
      </div>          
      <p id="bar__user">pminga@ubuntu: ~</p>        
    </section>        
        
    <section id="terminal__body">          
      <div id="terminal__prompt">            
        <span id="terminal__prompt--user">pminga@ubuntu:</span>            
        <span id="terminal__prompt--location">~</span>            
        <span id="terminal__prompt--bling">$ </span> 
    
        <span id="terminal__prompt--cursor"></span>          
      </div>        
    </section>      
  </div>    
  </main>
    </>
  );
};

export default AppWrapp(
  MotionWrap(ShowCase, 'app__showcase'),
  'ShowCase',
  'app__primarybg',
);