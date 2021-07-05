import styled from 'styled-components';

export const Container = styled.button`
  width: 220px;
  height: 80px;
  margin: 0 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.actived ? '#F9AA33' : '#344955'};
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #F9AA33;
  }

  img {
    width: 22px;
    align-self: flex-start;
  }

  span {
    color: white;
    font-weight: bold;
    align-self: flex-end;
    font-size: 1.1rem;
  }
`
