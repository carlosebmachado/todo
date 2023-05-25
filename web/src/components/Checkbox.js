import React, { useMemo } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import icons from '../utils/typeicons'
import { Link } from 'react-router-dom';


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
    background-color: #2196F3;
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
  /* background-color: #eee; */
  border-radius: 25px;
  box-shadow: 0px 0px 0px 2px #2196F3 inset;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

`;
