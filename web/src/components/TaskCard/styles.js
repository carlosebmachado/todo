import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  width: 270px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.40);
  border-radius: 5px;
  margin: 20px;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.done ? 0.5 : 1 };

  &:hover {
    opacity: 0.8;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Footer = styled.footer`
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    color: #F9AA33;
  }

  span {
    color: #707070;
  }
`
