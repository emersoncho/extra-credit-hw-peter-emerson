import React from 'react';
import logo from '../assets/logo.png';

const AboutPage = () => {
  return (
    <div className="container my-2">
      <img className="logo mb-2" src={logo} alt="Logo" />
      <section className="mt-3">
        <h1 className="mb-1">Student Survey Dashboard</h1>
      </section>
      <p>Welcome to the EC dashboard!</p>
      <p>Access the survey links in the navbar above</p>
    </div>
  );
};

export default AboutPage;