import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import * as ROUTES from '../lib/routes';

import SubmitButton from './SubmitButton';
import api from '../lib/api';
import SnackbarContext from './SnackBar';

const initialValues = {
  code: '',
};

const JoinGameForm: React.FC = () => {
  const history = useHistory();
  const openSnackbar = useContext(SnackbarContext);

  const joinGameForm = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validationSchema: yup.object({
      code: yup.string().min(4, 'At least 4 characters').required('Code must be set'),
    }),
    onSubmit: ({ code }) => {
      return api
        .getGame(code)
        .then(() => {
          history.push(ROUTES.createPlayUrl(code));
          openSnackbar({ content: 'Successfully joined game', severity: 'success' });
        })
        .catch((err) => {
          openSnackbar({ content: err.message, severity: 'error' });
        });
    },
  });

  return (
    <>
      <TextField
        fullWidth
        id="code"
        variant="filled"
        label="Code"
        value={joinGameForm.values.code}
        error={joinGameForm.touched.code && !!joinGameForm.errors.code}
        helperText={joinGameForm.touched.code && joinGameForm.errors.code}
        onBlur={joinGameForm.handleBlur}
        onChange={joinGameForm.handleChange}
      />
      <SubmitButton
        loading={joinGameForm.isSubmitting}
        color="primary"
        disabled={joinGameForm.isSubmitting || joinGameForm.isValidating || !joinGameForm.isValid}
        onClick={joinGameForm.submitForm}
        variant="contained"
      >
        Join
      </SubmitButton>
    </>
  );
};

export default JoinGameForm;
