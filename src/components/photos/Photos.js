import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Load } from "../common/Loading";
import {
  getMainPhotos,
  isLoading,
  getMainPhotosCount,
} from "../store/selectors";
import { LoadMore } from "../common/LoadMore";
import { fetchMainPhotos } from "../store/actions";
import {
  INCREMENT_MAIN_PHOTOS_COUNT,
  RESET_MAIN_PHOTOS_COUNT,
} from "../store/types";

const Header = styled.h1`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  margin: 10px;
`;

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  max-width: 1000px;
  margin: 50px auto 0;
  height: calc(100vh - 120px);
  overflow: scroll;
  div {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
`;

export const Photos = () => {
  const dispatch = useDispatch();
  const count = useSelector(getMainPhotosCount);

  useEffect(() => dispatch(fetchMainPhotos(count)), [count, dispatch]);

  const mainPhotos = useSelector(getMainPhotos);
  const isLoadingMain = useSelector(isLoading);

  return (
    <div>
      {isLoadingMain.main ? (
        <Load>LOADING....</Load>
      ) : (
        <>
          <Header>Photos</Header>
          <PhotosWrapper>
            {mainPhotos.map((photo) => {
              return (
                <Link
                  to={`/photo/${photo.id}`}
                  onClick={() => {
                    dispatch({ type: RESET_MAIN_PHOTOS_COUNT });
                  }}
                  key={uuidv4()}
                >
                  <img src={photo.thumbnailUrl} alt={photo.title}></img>
                </Link>
              );
            })}
          </PhotosWrapper>
          <LoadMore
            action={() => {
              dispatch({ type: INCREMENT_MAIN_PHOTOS_COUNT });
            }}
          >
            Load More {mainPhotos.length}
          </LoadMore>
        </>
      )}
    </div>
  );
};
