import React, { useMemo } from 'react';
import { format } from 'date-fns';
import * as S from './styles';
import icons from '../../utils/typeicons'


function TaskCard(props) {
  // const date = useMemo(() => format(new Date(props.when), 'dd/MM/yyyy'), [props.when]);
  const date = useMemo(() => format(new Date(props.when), 'MM-dd-yyyy'), [props.when]);
  const hour = useMemo(() => format(new Date(props.when), 'HH:mm'), [props.when]);

  return (
    <S.Container done={props.done}>
      <S.Header>
        <img src={icons[props.type]} alt="Task Icon" />
        <h3>{props.title}</h3>
      </S.Header>
      <S.Footer>
        <strong>{date}</strong>
        <span>{hour}</span>
      </S.Footer>
    </S.Container>
  );
}

export default TaskCard;
