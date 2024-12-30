import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVerifyAccountMutation } from "../../../redux/auth/auth-api";
import Button from "../../components/Button";
import { Alert } from "@mui/material";
import { useQuery } from "../../hooks/routerHelpers";
import { useState, useEffect } from "react";

export default function VerifyAccount() {
  const query = useQuery();

  const [verifyAccount, { isSuccess, isError, isLoading, error, data }] = useVerifyAccountMutation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const token = query.get('token')

  const handleClick = async () => {


if (token) {
      await verifyAccount(token );
    }

  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true); // Başarı mesajını göster
      const timer = setTimeout(() => {
        navigate('/login'); // Belirli bir süre sonra yönlendir
      }, 3000);

      return () => clearTimeout(timer); // Temizlik işlemi
    }
  }, [isSuccess, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>VERIFY ACCOUNT</Title>
        {showSuccessMessage ? (
          <Alert variant="outlined" severity="success">
            {data?.message || "Your account has been successfully verified!"}
          </Alert>
        ) : (
          <>
            <Description>
              Click the button below to verify your account. If you didn’t request this, you can ignore this message.
            </Description>
            <Button onClick={handleClick} isLoading={isLoading} title={'Verify'} />
          </>
        )}

        {isError && (
          <Alert variant="outlined" severity="error">
            {error?.data?.message}
          </Alert>
        )}

        <LinkWrapper>
          <Link onClick={() => navigate('/')}>BACK TO HOME PAGE</Link>
        </LinkWrapper>
      </Wrapper>
    </Container>
  );
}

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
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

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
