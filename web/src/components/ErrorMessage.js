import React from 'react';
import styled from 'styled-components';
import constants from '../constants';

export const errorMessageTimeout = constants.settings.errorMessageTimeout;

export default function Footer({ error }) {
  return (
    <Container>
      <p>{error}</p>
    </Container>
  );
}

export const Container = styled.div`
  padding: 0px 10px 2px 10px;
  color: white;
  border-radius: 5px;
  background-color: ${constants.colors.danger};
`
