import styled from "styled-components";
import constants from "../../constants";

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${props => props.active ? constants.colors.secondary : constants.colors.primary};
  border-radius: 50%;
  color: white;
`;