import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { TextField, Typography } from '@material-ui/core';
import AuthContext from '../context/AuthContext';
import api from '../lib/api';
import SnackbarContext from './SnackBar';
import SubmitButton from './SubmitButton';

const initialValues = {
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const openSnackbar = useContext(SnackbarContext);

  const registerForm = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    isInitialValid: false,
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().min(6, 'At least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      return api
        .register(values)
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
        Register
      </Typography>
      <TextField
        fullWidth
        id="email"
        autoComplete="email"
        variant="filled"
        label="Email"
        value={registerForm.values.email}
        error={registerForm.touched.email && !!registerForm.errors.email}
        helperText={registerForm.touched.email && registerForm.errors.email}
        onBlur={registerForm.handleBlur}
        onChange={registerForm.handleChange}
      />
      <TextField
        fullWidth
        id="password"
        variant="filled"
        type="password"
        label="Password"
        value={registerForm.values.password}
        error={registerForm.touched.password && !!registerForm.errors.password}
        helperText={registerForm.touched.password && registerForm.errors.password}
        onBlur={registerForm.handleBlur}
        onChange={registerForm.handleChange}
      />
      <SubmitButton
        disabled={registerForm.isSubmitting || registerForm.isValidating || !registerForm.isValid}
        variant="contained"
        color="primary"
        onClick={registerForm.submitForm}
        loading={registerForm.isSubmitting}
      >
        Register
      </SubmitButton>
    </>
  );
};

export default RegisterForm;
