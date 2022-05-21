import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";


const GlobalStyled = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor}
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyled;