import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  FETCH_REQUEST_MAIN,
  FETCH_MAIN_PHOTO_SUCCESS,
  INCREMENT_MAIN_PHOTOS_COUNT,
  RESET_MAIN_PHOTOS_COUNT,
  FETCH_REQUEST_SELECT,
  FETCH_SELECTED_PHOTO_SUCCESS,
  FETCH_ALBUM_SUCCESS,
  INCREMENT_ALBUM_PHOTOS_COUNT,
  RESET_ALBUM_PHOTOS_COUNT,
  FETCH_REQUEST_ALBUM,
} from "./types";

const reduser = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST_MAIN:
      return { ...state, isLoading: { ...state.isLoading, main: true } };
    case FETCH_MAIN_PHOTO_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, main: false },
        main: [...action.data],
      };
    case INCREMENT_MAIN_PHOTOS_COUNT:
      return {
        ...state,
        mainCount: state.mainCount + 6,
      };
    case RESET_MAIN_PHOTOS_COUNT:
      return {
        ...state,
        mainCount: 6,
      };
    case FETCH_REQUEST_SELECT:
      return { ...state, isLoading: { ...state.isLoading, select: true } };
    case FETCH_SELECTED_PHOTO_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, select: false },
        selected: action.data,
      };
    case FETCH_REQUEST_ALBUM:
      return { ...state, isLoading: { ...state.isLoading, album: true } };
    case FETCH_ALBUM_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, album: false },
        album: action.data,
      };
    case INCREMENT_ALBUM_PHOTOS_COUNT:
      return {
        ...state,
        albumCount: state.albumCount + 6,
      };
    case RESET_ALBUM_PHOTOS_COUNT:
      return {
        ...state,
        albumCount: 6,
      };
    default:
      return state;
  }
};

const initialState = {
  isLoading: { main: true, select: true, album: true },
  main: [],
  selected: [],
  mainCount: 6,
  albumCount: 6,
  album: [],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reduser,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
