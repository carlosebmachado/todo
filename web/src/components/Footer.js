import React from 'react';
import styled from 'styled-components';
import constants from '../constants';


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
  background-color: white;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);

  small {
    color: ${constants.colors.primary};
  }
`
