import { Card, TextField, Grid, Stack, Button } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React,{useEffect, useState} from 'react'
import Page from '../components/Page';
import Label from '../components/Label';


function FormWedding() { 
  const Navigate = useNavigate();
  const Location = useLocation();
  const [myUsername, setMyusername] = useState('')
  useEffect(() => {
    const isAuthorized = () =>{
      axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/auth/me`,{
        headers:{
          'Authorization' : Location.state
        }
      })
      .then((response)=> {
        if(response.state === 200){
          setMyusername(response.data.name)
        }
      })
      .catch((e)=> console.log(e))
    }
    isAuthorized();    
  }, []);


  return (
    <div>
      <Page title="Input Wedding Organizer">
        <Card title='Wedding'>
          <Container maxWidth="lg">
            <Stack direction="column" spacing={6}>
            <Page title="test"/>
            <TextField id="outlined-basic" label="Name" variant="outlined" name='name' />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <Button variant="contained">{myUsername}</Button>
            </Stack>
          </Container>
        </Card>
      </Page>
    </div>
  );
};

export default FormWedding;