import styled from 'styled-components'

export const Button = styled.button`
  padding: 10px;
  font-size: 15px;
  color: #ffffff;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
`;