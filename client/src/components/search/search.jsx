import React, { useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // receiveAlbums,
  // receiveArtists,
  receiveTracks,
  searchRequest,
} from "../../redux/actions/searchActions";
import SearchResult from "./searchResults";
import { IconContext } from "react-icons";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  const accessToken = useSelector((state) => state.auth.token);
  const imgSrc = useSelector((state) => state.users.currentUser.imageSrc);

  const handleChange = (e) => {
    setValue(e.target.value);
    //search();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchTrack();
    }
  };

  const handleclick = () => {
    searchTrack();
    //setValue("");
  };

  const searchTrack = async () => {
    dispatch(searchRequest());
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const query = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        value
      )}&type=track&market=CA`,
      options
    );
    const res = await query.json();
    console.log(res);
    const { tracks } = res;
    // dispatch(receiveAlbums(albums));
    // dispatch(receiveArtists(artists));
    dispatch(receiveTracks(tracks));
  };

  return (
    <>
      <Wrapper>
        <ArrowWrap>
          <IconContext.Provider value={{ color: "#ffffff", size: "2.5em" }}>
            <Button onClick={() => history.goBack()}>
              <MdKeyboardArrowLeft />
            </Button>
          </IconContext.Provider>
        </ArrowWrap>
        <InputWrap>
          <Input
            type="search"
            value={value}
            onChange={handleChange}
            placeholder="search"
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={handleclick}>search</SearchButton>
        </InputWrap>
        <ImgWrap>
          <Avatar src={imgSrc} alt="" />
        </ImgWrap>
      </Wrapper>
      <SearchResult />
    </>
  );
};

const Input = styled.input`
  margin: 0 5px;
  border-radius: 18px;
  padding: 5px 7px;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  margin: 0 5px;
  border-radius: 18px;
  padding: 5px 7px;
  border: none;
  outline: none;
`;

const InputWrap = styled.div`
  margin: auto 15px;
`;

const ArrowWrap = styled.div`
  position: absolute;
  left: 7px;
  top: 10px;
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

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

export default Search;
