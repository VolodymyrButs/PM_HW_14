import styled from "styled-components";

const LoadMoreButton = styled.button`
  width: 250px;
  background-color: #1ca4d8;
  border-radius: 17px;
  border: none;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  padding: 8px;
  margin: 10px auto;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: none;
  }
`;

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const LoadMore = ({ action, children, disable }) => {
  return (
    <LoadMoreButtonWrapper>
      <LoadMoreButton disabled={disable} onClick={() => action()}>
        {children}
      </LoadMoreButton>
    </LoadMoreButtonWrapper>
  );
};
