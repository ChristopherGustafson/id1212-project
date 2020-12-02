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

const CreateGameForm: React.FC = () => {
  const history = useHistory();
  const openSnackbar = useContext(SnackbarContext);

  const createGameForm = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validationSchema: yup.object({
      code: yup.string().min(4, 'At least 4 characters').required('Code must be set'),
    }),
    onSubmit: ({ code }) => {
      return api
        .createGame(code)
        .then((chessGame) => {
          history.push(ROUTES.PLAY_GAME, chessGame);
          openSnackbar({ content: 'Successfully created game', severity: 'success' });
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
        value={createGameForm.values.code}
        error={createGameForm.touched.code && !!createGameForm.errors.code}
        helperText={createGameForm.touched.code && createGameForm.errors.code}
        onBlur={createGameForm.handleBlur}
        onChange={createGameForm.handleChange}
      />
      <SubmitButton
        loading={createGameForm.isSubmitting}
        color="primary"
        disabled={
          createGameForm.isSubmitting || createGameForm.isValidating || !createGameForm.isValid
        }
        onClick={createGameForm.submitForm}
        variant="contained"
      >
        Create
      </SubmitButton>
    </>
  );
};

export default CreateGameForm;
