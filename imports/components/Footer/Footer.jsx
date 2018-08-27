import React from 'react';
import styled from 'styled-components';
import './Footer.css';

const FooterElement = styled.footer`
  background-color: black;
  color: white;
  padding: 15px;
  font-size: 14px;
  font-weight: 300;
  margin-top: 105px;
`;

const Footer = () => (
  <FooterElement>
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
  </FooterElement>
);

export default Footer;
