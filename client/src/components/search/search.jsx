import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  // receiveAlbums,
  // receiveArtists,
  receiveTracks,
  searchRequest,
} from "../../redux/actions/searchActions";
import SearchResult from "./searchResults";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const accessToken = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    setValue(e.target.value);
    //search();
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
    <Wrapper>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleclick}>search</button>
      <SearchResult />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Search;
