import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../../redux/actions/searchActions";
import { ajouteToQueue } from "../../redux/actions/queueActions";

const SearchResult = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.items);
  const accessToken = useSelector((state) => state.auth.token);

  const addToQueue = async (item) => {
    console.log(item);
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    await fetch(
      `https://api.spotify.com/v1/me/player/queue?uri=${item.uri}`,
      options
    );
    dispatch(ajouteToQueue(item));
    dispatch(clearSearch());
  };

  if (!searchResult || searchResult === null) {
    return null; // todo loading
  }

  return searchResult.map((result) => {
    return (
      <p>
        {result.name} - <span>{result.artists[0].name}-</span>
        <button onClick={() => addToQueue(result)}>add</button>
      </p>
    );
  });
};

export default SearchResult;
