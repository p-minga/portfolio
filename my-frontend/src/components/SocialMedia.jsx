import React from 'react'
import {FaLinkedin} from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
        <a
          href="https://www.linkedin.com/in/pierre-minga-470676155"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
            <FaLinkedin />
        </a>
        </div>
    </div>
  )
}

export default SocialMedia