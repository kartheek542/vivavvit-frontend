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

export const CategoryButton = styled.button`
  padding: 10px;
  font-size: 15px;
  color: ${props => (props.isActive ? "#5f6f87" : "#000000")};
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #bac5d6;
  border: none;
  border-color: #5f6f87;
  border-bottom-width: 10px;
  border-bottom-style: ${props => (props.isActive ? 'solid': 'none')}
`

export const HButton = styled(Button)`
  border-color: #ffffff;
  border-radius: 20px;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`

export const FButton = styled(Button)`
  width: 100%;
  margin-left: 0px;
`