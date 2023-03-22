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
  
  a {
    align-self: center;
    
    img {
      width: 100px;
    }
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
    transition: all 0.3s ease;

    &:hover {
      color: #F9AA33;
    }
  }

  #notification {
    transition: all 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;

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
      opacity: 0.75;
    }
  }

  .divider::after {
    content: "|";
    margin: 0 10px;
    color: white;
    opacity: 0.5;
  }

  button {
    font-size: 1rem;
    text-transform: uppercase;
    background: none;
    border: none;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #F9AA33;
    }
  }
`
