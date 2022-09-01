import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';
import swal from 'sweetalert';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [myUsername, setUsername] = useState('')
  const [myPassword, setPassword] = useState('')

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: myUsername,
    password: myPassword
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema)
  });


  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  const handleUser = e => {
    setUsername(e.target.value)
    console.log(myUsername,'e')
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const HandleSubmit = event => {
    event.preventDefault();

    axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/auth/login`, defaultValues)
    .then((response)=> {
      if(response.status === 200){
        navigate('/dashboard/wedding', {
          state: response.data.authToken          
        })
        localStorage.setItem('myToken', response.data.authToken);
    }})
    .catch((error)=> swal("Warning!", "Data yang anda masukan salah!", "error"))
  }

  return (
    <FormProvider methods={methods} onSubmit={HandleSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Email address" onChange={handleUser}/>

        <RHFTextField
          name="password"
          label="Password"
          onChange={handlePassword}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </FormProvider>
  );
}
