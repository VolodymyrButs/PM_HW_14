import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { getAlbum, getAlbumPhotosCount, isLoading } from "../store/selectors";
import { LoadMore } from "../common/LoadMore";
import { Load } from "../common/Loading";
import { fetchAlbum } from "../store/actions";
import {
  RESET_ALBUM_PHOTOS_COUNT,
  INCREMENT_ALBUM_PHOTOS_COUNT,
} from "../store/types";

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  max-width: 1000px;
  margin: 0px auto;
  height: calc(100vh - 230px);
  overflow: scroll;
  div {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
`;

export const Album = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const count = useSelector(getAlbumPhotosCount);

  useEffect(() => {
    dispatch(fetchAlbum(id, count));
  }, [count, dispatch, id]);

  const album = useSelector(getAlbum);
  const isLoadingAlbum = useSelector(isLoading);
  const { user, albumData, photo } = album;

  return (
    <div>
      {isLoadingAlbum.album ? (
        <Load>LOADING....</Load>
      ) : (
        <>
          <Link
            to={"/"}
            onClick={() => {
              dispatch({ type: RESET_ALBUM_PHOTOS_COUNT });
            }}
          >
            Home
          </Link>
          <p>
            <b>Album name: </b> {albumData.title}
          </p>
          <p>
            <b>User name:</b> {user.user.name}
          </p>
          <p>
            <b>User email:</b> {user.user.email}
          </p>
          <br />
          <PhotosWrapper>
            {photo.map((photo) => {
              return (
                <Link
                  to={`/photo/${photo.id}`}
                  onClick={() => {
                    dispatch({ type: RESET_ALBUM_PHOTOS_COUNT });
                  }}
                  key={uuidv4()}
                >
                  <img src={photo.thumbnailUrl} alt={photo.title}></img>
                </Link>
              );
            })}
          </PhotosWrapper>

          <LoadMore
            disable={count >= 50}
            action={() => {
              dispatch({ type: INCREMENT_ALBUM_PHOTOS_COUNT });
            }}
          >
            Load More {photo.length}/50
          </LoadMore>
        </>
      )}
    </div>
  );
};
