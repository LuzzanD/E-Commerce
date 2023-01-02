import React from 'react'
import {AiFillLinkedin, AiOutlineGithub} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Andrija's Store Allrights Reserved</p>
      <div className="icons">
        <a
          className="icon"
          href="https://www.linkedin.com/in/andrija-stojanović-1512411a6" 
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiFillLinkedin size={30}/>
        </a>
        <a
          className="icon"
          href="https://github.com/LuzzanD" 
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineGithub size={30}/>
        </a>
      </div>
    </div>
  )
}

export default Footer