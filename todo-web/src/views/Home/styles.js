import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
  /* overflow: auto; */
`;

export const FilterWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 30px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-around;
`

export const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #344955;
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #344955;
    position: relative;
    top: 34px;
    text-transform: uppercase;
    background-color: white;
    font-size: 1.7rem;
    display: inline-block;
    padding: 0 20px;
  }
`

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  a {
    text-decoration: none;
  }

`
