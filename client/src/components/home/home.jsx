import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "./footer";
import Header from "./header";

const Home = () => {
  //todo
  const room = "room reducer to set";

  return (
    <>
      <Header />
      <Wrapper>
        <Text>
          there is no active room at the moment activate one and invite friends
          by pressing the + icon below
        </Text>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  background-color: #20252a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: white;
  font-family: "Comfortaa" cursive;
  font-size: 18px;
  font-weight: 400;
  padding: 40px;
  text-align: center;
`;

export default Home;
