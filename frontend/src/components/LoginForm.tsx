import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, styled, TextField, Typography } from '@material-ui/core';
import AuthContext from '../context/AuthContext';
import api from '../lib/api';
import SnackbarContext from './SnackBar';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const openSnackbar = useContext(SnackbarContext);
  const { login } = useContext(AuthContext);

  const loginForm = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().min(6, 'At least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      return api
        .login(values)
        .then((user) => {
          login(user);
        })
        .catch((err) => {
          openSnackbar({ content: err.message, severity: 'error' });
        });
    },
  });

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Login
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
      <SubmitButton
        disabled={loginForm.isValidating || !loginForm.isValid}
        variant="contained"
        color="primary"
        onClick={loginForm.submitForm}
      >
        Login
      </SubmitButton>
    </>
  );
};

const SubmitButton = styled(Button)({
  marginTop: 10,
  width: '100%',
});

export default LoginForm;
