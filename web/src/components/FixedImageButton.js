import React, { useMemo } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import icons from '../utils/typeicons'
import { Link } from 'react-router-dom';


export default function Checkbox(props) {
  return (
    <Container onClick={props.onClick}>
      +
    </Container>
  );
}

const Container = styled.button`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  font-size: 40px;
  color: white;
  user-select: none;
  cursor: pointer;
  background-color: #F9AA33;
  
  position: absolute;
  bottom: 80px;
  /*
  --sideWidth: calc(100vw - 1200);
  --halfSideWidth: calc(var(--sideWidth) / 2);
  right: calc(100vw - var(--halfSideWidth));
  */
`;
