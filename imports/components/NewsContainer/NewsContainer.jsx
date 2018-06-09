import React from 'react';
import './NewsContainer.css';

const NewsContainer = props => (
  <section>
    <h2>content {props.newsArray[0]}</h2>
  </section>
);

export default NewsContainer;
