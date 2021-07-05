import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #344955;
  border-bottom: 5px solid #F9AA33;
`

export const LeftSide = styled.div`
  display: flex;
  width: 50%;
  height: 70px;
  padding-left: 10px;
  img {
    width: 100px;
    align-self: center;
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  height: 70px;

  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    margin: 0 10px;

    &:hover {
      color: #F9AA33;
    }
  }

  #notification {
    img {
      width: 22px;
    }

    span {
      position: relative;
      top: -12px;
      right: 10px;
      background-color: white;
      color: #F9AA33;
      padding: 0 4px;
      border-radius: 50%;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  .divider::after {
    content: "|";
    margin: 0 10px;
    color: white;
    opacity: 0.5;
  }
`
