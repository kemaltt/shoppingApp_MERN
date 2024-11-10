import { useState } from "react";
import styled from "styled-components";
// import { mobile } from "../responsive";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/auth/auth-api";
import Button from "../../components/Button";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [register, { isLoading, error, isError, isSuccess }] = useRegisterMutation()
  // const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { loading, error, user } = useSelector((state) => state.user);
  const handleClick = async (e) => {
    e.preventDefault();
    const user = { name, email, password };
    // register(dispatch, user);
    await register(user)
  };
  if (isSuccess) {
    navigate('/login')
  }


  return (
    <Container>
      <Wrapper>
        <Title>REGISTER</Title>
        <Form>
          {/* <Input
            placeholder="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <TextField
            id="outlined-name-input"
            label="Name"
            type="name"
            required
            autoComplete="current-name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            required
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
              label="Password"
            />
          </FormControl>
          {/* <Button onClick={handleClick} >
            Register {isLoading && <Spinner animation="border" size="sm" />
            }
          </Button> */}
          <Button onClick={handleClick} isLoading={isLoading} title={'Register'} />
          {isError && <Error> {error?.data?.message}</Error>}
        </Form>
        <LinkWrapper>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate('/login')}>YOU HAVE ALREADY AN ACCOUNT? LOGIN</Link>
        </LinkWrapper>
      </Wrapper>
    </Container>
  );
};

export default Register;