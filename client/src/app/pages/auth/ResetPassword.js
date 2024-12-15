import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/auth/auth-api";
import Button from "../../components/Button";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";





export default function ResetPassword() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [login, { isError, isLoading, error }] = useLoginMutation()

  const navigate = useNavigate()

  const handleClick = async (value) => {
    const { conform_password, password } = value;

    if (conform_password && password) {
      await login({ password });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Form onSubmit={handleSubmit(handleClick)}>
          <FormControl fullWidth >
            <InputLabel htmlFor="outlined-adornment-password" color={errors.password ? 'error' : 'secondary'} >PASSWORD</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              color={errors.password ? 'error' : 'secondary'}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="PASSWORD"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                  message: "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                },
              })}

            />
            {errors.password && errors.password.message}

          </FormControl>
          <FormControl fullWidth >
            <InputLabel htmlFor="outlined-adornment-password" color={errors.password ? 'error' : 'secondary'} >CONFIRM PASSWORD</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? 'text' : 'password'}
              color={errors.conform_password ? 'error' : 'secondary'}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="CONFIRM PASSWORD"
              {...register("conform_password", {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                  message: "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                },
              })}

            />
            {errors.conform_password && errors.conform_password.message}

          </FormControl>

          <Button onClick={handleClick} isLoading={isLoading} title={'Update'} />
          {isError && <Error> {error?.data?.message}</Error>}

        </Form>

        <LinkWrapper>
          <Link onClick={()=> navigate('/forgot-password')} >DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate('/register')}>CREATE A NEW ACCOUNT</Link>
        </LinkWrapper>

      </Wrapper>
    </Container>
  );
};



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
   linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;

   @media (max-width: 600px) {
    width: 80%; 
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 10px 15px;
//   // background-color: teal;
//     background-image: linear-gradient(260deg,
//       #2376ae 0%,
//       #c16ecf 100%) ;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   font-size: 1.4rem;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
// `;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

