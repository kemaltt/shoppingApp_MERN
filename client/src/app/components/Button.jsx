import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';



const StyledButton = styled.button`
width: 40%;
border: none;
padding: 10px 0;
background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
color: white;
cursor: pointer;
font-size: 1.4rem;
transition: background-image 0.5s ease-in-out;

&:hover {
  background-image: linear-gradient(260deg, #c16ecf 0%, #2376ae 100%);
}
// &:disabled {
//   cursor: not-allowed;
//   background-image: linear-gradient(260deg, #d3d3d3 0%, #a9a9a9 100%);
// }
`;

export default function Button({ variant, type, title, onClick, disabled, isLoading }) {
  // const style = {
  //   width: "40%",
  //   border: "none",
  //   paddingTop: "10px",
  //   paddingBottom: "10px",
  //   backgroundImage: "linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)",
  //   color: "white",
  //   cursor: "pointer",
  //   fontSize: "1.4rem",
  //   hover: {

  //   },
  // };

  return (
    <StyledButton
      type={type}
      // style={style}
      variant={variant}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {title} {isLoading && <Spinner animation="border" size="sm" />}
    </StyledButton>
  );
}
