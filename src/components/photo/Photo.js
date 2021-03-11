import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Load } from "../common/Loading";
import { getSelectedPhoto, isLoading } from "../store/selectors";
import { fetchSelectedPhotos } from "../store/actions";
const PhotoWrapper = styled.div`
  margin: 40px;
`;

export const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSelectedPhotos(id)), [id, dispatch]);

  const photo = useSelector(getSelectedPhoto);
  const isLoadingSelected = useSelector(isLoading);

  return (
    <div>
      {isLoadingSelected.select ? (
        <Load>LOADING....</Load>
      ) : (
        <>
          <PhotoWrapper>
            <h1>Name: {photo.title}</h1>
            <br />
            <img
              src={photo.url}
              alt={photo.title}
              style={{ height: "600px" }}
            />
            <br />
            Go to album:{" "}
            <Link to={`/album/${photo.albumId}`}>{photo.album.title}</Link>
          </PhotoWrapper>
        </>
      )}
    </div>
  );
};
