import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';



export default function Button({ variant, type, title, onClick, disabled, isLoading }) {
  const style = {
    width: "40%",
    border: "none",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundImage: "linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)",
    color: "white",
    cursor: "pointer",
    fontSize: "1.4rem",
  };

  return (
    <BootstrapButton
      type={type}
      style={style}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {title} {isLoading && <Spinner animation="border" size="sm" />}
    </BootstrapButton>
  );
}
