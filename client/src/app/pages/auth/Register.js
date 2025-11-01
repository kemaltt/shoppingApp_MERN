import { useState } from "react";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useRegisterMutation } from "../../../redux/auth/auth-api";
import { useTranslation } from "react-i18next";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";



const Register = () => {
  const { register: signUp, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [register, { data, isLoading, error, isError, isSuccess }] = useRegisterMutation()
  const navigate = useNavigate()
  const handleClick = async (value) => {
    const { name, email, password } = value;
    if (name && email && password) {
      await register(value);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title> {isSuccess ? t('auth.checkEmail') : t('auth.register')}   </Title>
        {isSuccess ? <Alert variant="outlined" severity="success">{data?.message}</Alert>
          : <>
            <Form onSubmit={handleSubmit(handleClick)} >

              <FormControl fullWidth >
                <TextField
                  required
                  fullWidth
                  id="name"
                  label={t('auth.name')}
                  name="name"
                  size='small'
                  autoComplete="current-name"
                  autoFocus
                  color={errors?.name ? 'error' : 'secondary'}
                  {...signUp("name", {
                    required: true,
                    pattern: {
                      value: /^.{2,25}$/,
                      message: t('validation.nameRequired'),
                    },
                  })}
                />
                {errors?.name && errors?.name.message}
              </FormControl>

              <FormControl fullWidth >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('auth.email')}
                  name="email"
                  size='small'
                  autoComplete="email"
                  autoFocus
                  color={errors?.email ? 'error' : 'secondary'}
                  {...signUp("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
                      message: t('validation.invalidEmail'),
                    },
                  })}
                />
                {errors.email &&
                  <Alert sx={{ marginTop: '10px' }} variant="outlined" severity="error">
                    {errors.email.message}
                  </Alert>
                }
              </FormControl>

              <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-password" color={errors?.password ? 'error' : 'secondary'} >{t('auth.password')} *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  color={errors?.password ? 'error' : 'secondary'}
                  size='small'
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? t('auth.hidePassword') : t('auth.showPassword')
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
                  label="Password"
                  {...signUp("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                      message: t('validation.passwordRequired'),
                    },
                  })}
                />
                {errors?.password && errors?.password.message}
              </FormControl>
              {/* <Button onClick={handleClick} >
  Register {isLoading && <Spinner animation="border" size="sm" />
  }
</Button> */}
              <Button onClick={handleClick} isLoading={isLoading} title={t('auth.register')} />
              {isError && <Alert variant="outlined" severity="error"> {error?.data?.message} </Alert>}
            </Form>
          </>
        }

        <LinkWrapper>
          <Link onClick={() => navigate('/login')}>{t('auth.haveAccount')}</Link>
          <Link onClick={() => navigate('/')}>{t('auth.backToHome')}</Link>
        </LinkWrapper>
      </Wrapper>
    </Container>
  );
};

export default Register;


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    // url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  text-align: center;
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
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
