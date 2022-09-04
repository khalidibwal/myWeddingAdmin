import * as Yup from 'yup';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showWedding, setShowWedding] = useState([]);
  const [woName, setWoName] = useState('');
  const [regisName, setRegisname] = useState('');
  const [regisUser, setRegisUser] = useState('');
  const [regisEmail, setRegisEmail] = useState('');
  const [regisPassword, setRegisPassword] = useState('');

  useEffect(() => {
    axios
      .get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/wo_desc`)
      .then((response) => {
        if (response.status === 200) {
          setShowWedding(response.data);
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const myDefault = {
    name: regisName,
    username: regisUser,
    email: regisEmail,
    password: regisPassword,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  function handleChange(e) {
    setWoName(e.target.value);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="FullName" />
        <RHFTextField name="username" label="Username" />
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Select labelId="demo-multiple-name-label" id="demo-multiple-name" value={woName} onChange={handleChange}>
          {showWedding.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              {name.wo_name}
            </MenuItem>
          ))}
        </Select>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
