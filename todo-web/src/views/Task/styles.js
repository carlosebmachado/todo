import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.div`
  width: 50%;
  margin-bottom: 70px;
`

export const TypeIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .inactive {
    opacity: 0.5;
  }

  button {
    background: none;
    border: none;
  }

  img {
    width: 50px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
`

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span {
    color: #707070;
    margin-bottom: 5px;
  }

  input {
    font-size: 1.2rem;
    padding: 10px;
    border: none;
    color: #414141;
    border-bottom: 1px solid #F9AA33;

    &:focus {
      outline: none;
    }
  }
`

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span {
    color: #707070;
    margin-bottom: 5px;
  }
  
  textarea {
    font-size: 1.2rem;
    padding: 10px;
    border: 1px solid #F9AA33;
    border-radius: 5px;
    resize: vertical;
    font-family: sans-serif;

    &:focus {
      outline: none;
    }

    &::-webkit-resizer {
      color: #F9AA33;
    }
  }
`

export const Options = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F9AA33;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.1rem;

    span {
      margin-left: 5px;
    }
  }

  button {
    font-weight: bolder;
    font-size: 1.1rem;
    color: #344955;
    border: none;
    background: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
`

export const Save = styled.div`
  width: 100%;
  margin-top: 30px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.75;
  }

  button {
    width: 100%;
    background-color: #F9AA33;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 8px 0 6px 0;
    cursor: pointer;
  }
`
