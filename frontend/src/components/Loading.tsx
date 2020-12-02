import { CircularProgress, styled } from '@material-ui/core';

const Loading: React.FC = () => (
  <Container>
    <CircularProgress size={50} />
  </Container>
);

const Container = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default Loading;
