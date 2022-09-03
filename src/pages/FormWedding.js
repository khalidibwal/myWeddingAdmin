// import { UserContext } from 'src/contextProvider/UserContext';
import { Card, TextField, Grid, Stack, Button } from '@mui/material';
import { Container } from '@mui/system';
import { UserContext } from 'src/contextProv/UserContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React,{useEffect, useState, useContext} from 'react'
import Page from '../components/Page';
import Label from '../components/Label';



function FormWedding() { 
  const Navigate = useNavigate();
  const Location = useLocation();
  const [myUsername, setMyusername] = useState('')
  const [authenticated, setauthenticated] = useState(null);
  const {dataName, setdataname} = useContext(UserContext)
  const {userEmail, setUserEmail} = useContext(UserContext)

  useEffect(() => {
    const getToken = localStorage.getItem('myToken')

    const isAuthorized = () =>{

      axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/auth/me`,{
        headers:{
          'Authorization' : getToken
        }
      })
      .then((response)=>{
        if (getToken) {
          setauthenticated(getToken);
          setdataname(response.data.name)
          setUserEmail(response.data.username)
        }
        else{
          Navigate('/login')
        }
      })  
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
            <Button variant="contained">Kirim Data</Button>
            </Stack>
          </Container>
        </Card>
      </Page>
    </div>
  );
};

export default FormWedding;