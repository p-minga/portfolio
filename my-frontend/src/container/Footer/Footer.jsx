import React, { useState } from 'react';
import { AppWrapp, MotionWrap } from '../../wrapper';
import './Footer.scss';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!username || !email || !message) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);
    setError('');

    const templateParams = {
      from_name: username,
      from_email: email,
      message: message,
      to_email: process.env.REACT_APP_EMAILJS_TO_EMAIL,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsFormSubmitted(true);
          setLoading(false);
          setFormData({ username: '', email: '', message: '' });
        },
        (error) => {
          console.error('EmailJS error:', error);
          setError('Failed to send message. Please try again.');
          setLoading(false);
        }
      );

  };

  return (
    <>
      <h2 className="head-text">Chat with me</h2>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="name" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrapp(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);