import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import icons from '../utils/typeicons'
import types from '../utils/typenames';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';


export default function TaskCard(props) {
  const [done, setDone] = useState(props.done);
  const date = useMemo(() => format(new Date(props.when), 'yyyy-MM-dd'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);

  return (
    <Container>
      <Checkbox done={done} setDone={setDone} />
      <ContentWrapper>
        <Link to={`/task/${props._id}`}>
          <h3>{props.title}</h3>
        </Link>
        <BottomWrapper>
          <DateWrapper>
            <strong>{date}</strong>
            <span>{hour}</span>
          </DateWrapper>
          <TypeWrapper>
            <span>{types[props.type]}</span>
            <img src={icons[props.type]} alt="Task Icon" />
          </TypeWrapper>
        </BottomWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border: none;
  border-bottom: 1px solid #ccc;
  /* cursor: pointer; */
  transition: all 0.3s ease;

  &:last-of-type {
    border-bottom: none;
  }

`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: row;

  h3 {
    color: #707070;
    font-size: 1rem;
    margin: 5px 10px;
  }

  & > a {
    text-decoration: none;
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  strong {
    color: #F9AA33;
    font-size: 0.8rem;
    margin: 0 10px;
  }

  span {
    color: #707070;
    font-size: 0.8rem;
  }

  img {
    width: 20px;
    margin: 0 10px;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;
