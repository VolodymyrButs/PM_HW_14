import {
  FETCH_REQUEST_MAIN,
  FETCH_MAIN_PHOTO_SUCCESS,
  FETCH_REQUEST_SELECT,
  FETCH_SELECTED_PHOTO_SUCCESS,
  FETCH_REQUEST_ALBUM,
  FETCH_ALBUM_SUCCESS,
} from "./types";

export const fetchRequestMain = () => {
  return { type: FETCH_REQUEST_MAIN };
};
export const fetchMainPhotoSuccess = (data) => {
  return { type: FETCH_MAIN_PHOTO_SUCCESS, data };
};

export const fetchMainPhotos = (count) => {
  return (dispatch) => {
    dispatch(fetchRequestMain());
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=${count}`
    )
      .then((response) => response.json())
      .then((data) => dispatch(fetchMainPhotoSuccess(data)));
  };
};

export const fetchRequestSelect = () => {
  return { type: FETCH_REQUEST_SELECT };
};
export const fetchSelectedPhotoSuccess = (data) => {
  return { type: FETCH_SELECTED_PHOTO_SUCCESS, data };
};

export const fetchSelectedPhotos = (id) => {
  return (dispatch) => {
    dispatch(fetchRequestSelect());
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}?_expand=album`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSelectedPhotoSuccess(data));
      });
  };
};

export const fetchRequesAlbum = () => {
  return { type: FETCH_REQUEST_ALBUM };
};
export const fetchAlbumSuccess = (data) => {
  return { type: FETCH_ALBUM_SUCCESS, data };
};

export const fetchAlbum = (id, count) => {
  return (dispatch) => {
    dispatch(fetchRequesAlbum());
    let user = {};
    let albumData = {};
    let photo = [];
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/photos/${id}?_expand=album`)
        .then((response) => response.json())
        .then((data) => (albumData = data)),
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user`)
        .then((response) => response.json())
        .then((data) => (user = data)),
      fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_start=0&_limit=${count}`
      )
        .then((response) => response.json())
        .then((data) => (photo = data)),
    ]).then(() => {
      dispatch(fetchAlbumSuccess({ user, albumData, photo }));
    });
  };
};
