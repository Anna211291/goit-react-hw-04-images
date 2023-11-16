import { LoadMoreBtnStyle } from './Button.styled';

export const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <LoadMoreBtnStyle type="button" onClick={handleLoadMore}>
      {' '}
      Load more{' '}
    </LoadMoreBtnStyle>
  );
};
