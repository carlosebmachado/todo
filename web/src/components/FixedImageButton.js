import React from 'react';
import styled from 'styled-components';


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
  
  position: fixed;
  bottom: 70px;
  /*
  --sideWidth: calc(100vw - 1200);
  --halfSideWidth: calc(var(--sideWidth) / 2);
  right: calc(100vw - var(--halfSideWidth));
  */
`;
