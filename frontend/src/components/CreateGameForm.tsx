import React from 'react';
import { useFormik } from 'formik';
import { TextField } from '@material-ui/core';

const initialValues = {
  code: '',
};

const CreateGameForm: React.FC = () => {
  const createGameForm = useFormik({ initialValues: initialValues, onSubmit: (values) => {} });

  return (
    <>
      <TextField
        fullWidth
        id="email"
        autoComplete="email"
        variant="filled"
        label="Email"
        value={createGameForm.values.code}
        error={createGameForm.touched.code && !!createGameForm.errors.code}
        helperText={createGameForm.touched.code && createGameForm.errors.code}
        onBlur={createGameForm.handleBlur}
        onChange={createGameForm.handleChange}
      />
    </>
  );
};

export default CreateGameForm;
