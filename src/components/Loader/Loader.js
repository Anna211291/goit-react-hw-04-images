import { LoaderWrapper } from 'components/GlobalStyle';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderWrapper>
  );
};
