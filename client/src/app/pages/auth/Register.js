import { useState } from "react";
import styled from "styled-components";
// import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useRegisterMutation } from "../../../redux/auth/auth-api";


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
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
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

  const [register, { isLoading, error, isError, isSuccess }] = useRegisterMutation()
  const dispatch = useDispatch();
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
          <Input
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
          />
          <Button onClick={handleClick} >
            REGISTER {isLoading && <Spinner animation="border" size="sm" />
            }
          </Button>
          {isError && <Error> {error?.data?.message}</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate('/login')}>YOU HAVE ALREADY AN ACCOUNT? LOGIN</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;