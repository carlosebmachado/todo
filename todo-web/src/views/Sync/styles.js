import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #F9AA33;
    font-weight: lighter;
    font-size: 1.5rem;
  }
  
  p {
    color: #344955;
  }
`

export const QRCodeArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Validation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  span {
    text-transform: uppercase;
    font-weight: bold;
    color: #344955;
  }

  input {
    font-size: 1rem;
    padding: 10px;
    text-align: center;
    border: none;
    border-radius: 5px;
    border: 1px solid #F9AA33;
    
    &:focus {
      outline: none;
    }
  }

  button {
    font-weight: bold;
    background-color: #F9AA33;
    color: white;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 10px;
    border: none;
    text-transform: uppercase;

    &:hover {
      background-color: #344955;
    }
  }
`
