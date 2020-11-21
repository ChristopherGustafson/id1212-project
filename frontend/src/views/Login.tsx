import { Button, Paper, styled, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const loginForm = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Root>
      <Card>
        <Typography variant="h4" gutterBottom>
          Login / Register
        </Typography>
        <TextField
          fullWidth
          id="email"
          autoComplete="email"
          variant="filled"
          label="Email"
          value={loginForm.values.email}
          error={loginForm.touched.email && !!loginForm.errors.email}
          helperText={loginForm.touched.email && loginForm.errors.email}
          onBlur={loginForm.handleBlur}
          onChange={loginForm.handleChange}
        />
        <TextField
          fullWidth
          id="password"
          variant="filled"
          type="password"
          label="Password"
          value={loginForm.values.password}
          error={loginForm.touched.password && !!loginForm.errors.password}
          helperText={loginForm.touched.password && loginForm.errors.password}
          onBlur={loginForm.handleBlur}
          onChange={loginForm.handleChange}
        />
        <SubmitButton variant="contained" color="primary" onClick={loginForm.submitForm}>
          Submit
        </SubmitButton>
      </Card>
    </Root>
  );
};

const Root = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Card = styled(Paper)({
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 275,
});

const SubmitButton = styled(Button)({
  marginTop: 10,
  width: '100%',
});

export default Login;
