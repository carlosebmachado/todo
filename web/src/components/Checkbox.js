import React, { useMemo } from 'react';
import styled from 'styled-components';
import constants from '../constants';


export default function Checkbox(props) {
  return (
    <Container>
      <input type="checkbox" checked={props.checked} onClick={props.setChecked} />
      <Checkmark className='checkmark' />
    </Container>
  );
}

const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 37px;
  margin-left: 15px;
  margin-bottom: 24px;
  font-size: 22px;
  user-select: none;
  cursor: pointer;

  &:hover input ~ .checkmark {
    background-color: #eee;
  }

  & input:checked ~ .checkmark {
    background-color: ${constants.colors.primary};
    box-shadow: none;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  box-shadow: 0px 0px 0px 2px ${constants.colors.primary} inset;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

`;
