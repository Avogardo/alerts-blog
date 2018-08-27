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
const LinkToProject = styled.a`
  color: #ffffff;
  transition: color 0.1s ease 0s;
  margin-left: 4px;
  
  &:hover {
    color: #ff4c6f;
  }
`;

const Footer = () => (
  <FooterElement>
    <div className="footer-content">
      Copyright ©2018 All rights reserved | This page is made by <strong className="author-name">Jakub Wolny</strong> |
      <LinkToProject
        className="link-to-github-project"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Avogardo/alerts-blog"
      >
        https://github.com/Avogardo/alerts-blog
      </LinkToProject>
    </div>
  </FooterElement>
);

export default Footer;
