import { Card, styled } from "@material-ui/core";

const Root = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Login = () => {
  return (
    <Root>
      <Card>Hej</Card>
    </Root>
  );
};

export default Login;
