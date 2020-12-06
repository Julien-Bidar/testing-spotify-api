import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <Wrapper>
      <IconContext.Provider value={{ color: "#ffffff", size: "2em" }}>
        <Link to="./room/add">
          <FaPlus />
        </Link>
      </IconContext.Provider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #2e2f31;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
`;

export default Footer;
