import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/auth/auth-api";
import Button from "../../components/Button";
import { FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";





export default function PasswordForgot() {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const [login, { isError, isLoading, error }] = useLoginMutation()

  const navigate = useNavigate()

  const handleClick = async (value) => {
    const { email, password } = value;

    if (email && password) {
      await login({ email, password });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>FORGOT PASSWORD?</Title>
        <Form onSubmit={handleSubmit(handleClick)}>
          <FormControl fullWidth >
            <TextField
              required
              fullWidth
              id="email"
              label="EMAIL"
              name="email"
              autoComplete="email"
              type="email"
              size="small"
              autoFocus
              color={errors.email ? 'error' : 'secondary'}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && errors.email.message}
          </FormControl>

          <Button onClick={handleClick} isLoading={isLoading} title={'Send'} />
          {isError && <Error> {error?.data?.message}</Error>}

        </Form>

        <LinkWrapper>
        <Link onClick={() => navigate('/login')}>YOU HAVE ALREADY AN ACCOUNT? LOGIN</Link>
        <Link onClick={() => navigate('/reset-password')}>ResetPassword</Link>
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



