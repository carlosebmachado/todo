import React from 'react';
import styled from 'styled-components';


export default () => {
  return (
    <Container>
      <small>&copy; ToDo - Organizing your life</small>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #344955;
  border-top: 3px solid #F9AA33;

  small {
    color: white;
  }
`
