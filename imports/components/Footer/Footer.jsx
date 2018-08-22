import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="footer-content">
      Copyright ©2018 All rights reserved | This page is made by <strong className="author-name">Jakub Wolny</strong> |
      <a
        className="link-to-github-project"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Avogardo/alerts-blog"
      >
        https://github.com/Avogardo/alerts-blog
      </a>
    </div>
  </footer>
);

export default Footer;
