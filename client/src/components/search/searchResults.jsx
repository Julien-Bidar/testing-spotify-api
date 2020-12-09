import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../../redux/actions/searchActions";
import { ajouteToQueue } from "../../redux/actions/queueActions";

const SearchResult = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.items);
  const currentUser = useSelector((state) => state.users.currentUser);
  const accessToken = useSelector((state) => state.auth.token);

  const addToQueue = async (item, user) => {
    // const options = {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // };
    // await fetch(
    //   `https://api.spotify.com/v1/me/player/queue?uri=${item.uri}`,
    //   options
    // );

    //-------------add track to db---------------//
    try {
      const dbReq = await fetch("/addtoqueue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: item, addedBy: user }),
      });
      const dbRes = await dbReq.json();
      console.log(dbRes);
    } catch (err) {
      console.log(err);
    }
    dispatch(ajouteToQueue(item, user));
    dispatch(clearSearch());
  };

  if (!searchResult || searchResult === null) {
    return null; // todo loading
  }

  return searchResult.map((result) => {
    return (
      <p>
        {result.name} - <span>{result.artists[0].name}-</span>
        <button onClick={() => addToQueue(result, currentUser)}>add</button>
      </p>
    );
  });
};

export default SearchResult;
