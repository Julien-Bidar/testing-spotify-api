import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = () => {
  const imgSrc = useSelector((state) => state.users.information.imageSrc);
  console.log(imgSrc);
  return (
    <Wrapper>
      <ImgWrap>
        <Avatar src={imgSrc} alt="" />
      </ImgWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  background-color: #2e2f31;
`;

const ImgWrap = styled.div`
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-right: 15px;
  overflow: hidden;
`;

const Avatar = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 100%;
  width: auto;
`;

export default Header;
