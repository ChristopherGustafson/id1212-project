import { Button, ButtonProps, CircularProgress, styled } from '@material-ui/core';

interface Props extends ButtonProps {
  loading: boolean;
}

const SubmitButton: React.FC<Props> = ({ loading, ...props }) => (
  <Wrapper>
    <InnerButton {...props} />
    {loading && <ButtonProgress size={24} />}
  </Wrapper>
);

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  position: 'relative',
}));

const InnerButton = styled(Button)({
  width: '100%',
});

const ButtonProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
});

export default SubmitButton;
