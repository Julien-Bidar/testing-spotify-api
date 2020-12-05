export const searchRequest = () => ({
  type: "SEARCH_REQUEST",
});

export const clearSearch = () => ({
  type: "CLEAR_SEARCH",
});

// we get albums not a track todo implement get tracks from the returned album
// export const receiveAlbums = (data) => ({
//   type: "RECEIVE_ALBUM",
//   data,
// });

export const receiveTracks = (data) => ({
  type: "RECEIVE_TRACKS",
  data,
});

// todo get best tracks from artists
// export const receiveArtists = (data) => ({
//   type: "RECEIVE_ARTISTS",
//   data,
// });

export const searchRequestError = () => ({
  type: "RECEIVE_SEARCH_REQUEST_ERROR",
});
