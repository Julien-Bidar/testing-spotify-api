import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { IconContext } from "react-icons";

const RoomHeader = () => {
  const imgSrc = useSelector((state) => state.users.currentUser.imageSrc);
  // //sessionAttempt
  // const history = useHistory();
  // const params = useParams();
  // const id = params.id;

  // //sessionAttempt
  // const handleClick = () => {
  //   history.push(`/search/${id}`);
  // };

  return (
    <Wrapper>
      <StyledLink to="/search">
        <SearchWrap>
          <IconContext.Provider value={{ color: "#2e2f31", size: "1.1em" }}>
            <ImSearch />
            {/* <Link to="/addroom">
          <FaPlus />
        </Link> */}
          </IconContext.Provider>
        </SearchWrap>
      </StyledLink>
      <ImgWrap>
        <Avatar src={imgSrc} alt="" />
      </ImgWrap>
    </Wrapper>
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 5px;
`;

const SearchWrap = styled.div`
  width: 150px;
  height: 25px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 15px;
  padding: 7px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

export default RoomHeader;
