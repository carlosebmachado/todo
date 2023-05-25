import React from 'react';
import styled from 'styled-components';

import filter from '../assets/filter.png'


export default (props) => {
  return (
    <Container onClick={props.onClick} actived={props.actived}>
      <img src={filter} alt="Filter" />
      <span>{props.title}</span>
    </Container>
  );
}

export const Container = styled.button`
  width: 100%;
  margin: 0 10px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.actived ? '#F9AA33' : '#344955'};
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #F9AA33;
  }

  img {
    width: 22px;
  }

  span {
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
  }
`
