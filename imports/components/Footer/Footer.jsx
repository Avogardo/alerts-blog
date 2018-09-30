import React from 'react';
import styled from 'styled-components';
import { sizes } from '../../../src/appHelper';

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
const AuthorName = styled.strong`
  font-weight: 300;
  white-space: nowrap;
`;
const FooterContent = styled.div`
  width: 1140px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${sizes.desktop}px) {
    width: unset;
    margin-left: unset;
    margin-right: unset;
  }
`;

const Footer = () => (
  <FooterElement>
    <FooterContent>
      Copyright ©2018 All rights reserved | This page is made by
      <AuthorName> Jakub Wolny</AuthorName> |
      <LinkToProject
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Avogardo/alerts-blog"
      >
        https://github.com/Avogardo/alerts-blog
      </LinkToProject>
    </FooterContent>
  </FooterElement>
);

export default Footer;
