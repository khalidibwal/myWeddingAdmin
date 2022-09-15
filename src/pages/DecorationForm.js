// import { UserContext } from 'src/contextProvider/UserContext';
import swal from 'sweetalert';
import { Card, CardContent, TextField, Grid, Stack, Button, FormControl } from '@mui/material';
import { Container } from '@mui/system';
import { UserContext } from 'src/contextProv/UserContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Page from '../components/Page';
import Label from '../components/Label';
import MyTable from 'src/components/tables/VenueTable';

function DecorationForm() {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [myUsername, setMyusername] = useState('');
  const [authenticated, setauthenticated] = useState(null);
//   const [myBuilding, setMyBuilding] = useState('');
//   const [myLocation, setMyLocation] = useState('');
//   const [myPrice, setMyPrice] = useState('');
  const [myDecor, setMyDecor] = useState('');
  const [tableData, setTable] = useState([])
  const { dataName, setdataname } = useContext(UserContext);
  const { userEmail, setUserEmail } = useContext(UserContext);
  const { myweddingid, setmyweddingid } = useContext(UserContext);
  const { userid, setuserid } = useContext(UserContext);

  useEffect(() => {
    const getToken = localStorage.getItem('myToken');

    const isAuthorized = () => {
      axios
        .get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/auth/me`, {
          headers: {
            Authorization: getToken,
          },
        })
        .then((response) => {
          if (getToken !== null) {
            setauthenticated(getToken);
            setdataname(response.data.name);
            setUserEmail(response.data.username);
            setmyweddingid(response.data.wo_desc_id);
            setuserid(response.data.id);
          } else {
            Navigate('/login');
          }
        });
    };


    isAuthorized();
    getTableData();
  }, [userid]);

  const defaultValues = {

  };

  const TablePageHeading = [
    {text:'Nama Gedung'},
    {text:'Lokasi'},
    {text:'Harga'}
  ]

  const getTableData = async() =>{
    await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/venue`,{
      params:{
        users_id: userid
      }
    })
    .then((response)=> {
      if(response.status === 200){
        console.log(response.data,'e')
        setTable(response.data)
      }
    }) 
  }

  const handleDecor = (e) => {
    setMyDecor(e.target.value);
  };


  const onSubmit = (e) => { 
    e.preventDefault();
    axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/venue`, defaultValues).then((response) => {
      if (response.status === 200) {
        swal('Successfully Save!', 'Data Berhasil Disimpan!', 'success');
        window.location.reload();
      } else {
        swal('Something Wrong!', 'Data gagal tersimpan!', 'error');
      }
    });
  };

  return (
    <div>
      <Page title="Input Wedding Organizer">
        <Card title="Wedding">
          <CardContent>
            <form onSubmit={onSubmit}>
              <Container maxWidth="lg">
                <Stack direction="column" spacing={6}>
                  <Page title="test" />
                  <TextField
                    id="outlined-basic"
                    label="Nama Dekorasi"
                    variant="outlined"
                    name="building_name"
                    onChange={handleDecor}
                  />

                  <Button variant="contained" type="submit" value="Submit">
                    Kirim Data
                  </Button>
                </Stack>
              </Container>
            </form>
          </CardContent>
        </Card>
        <br />
        <Card>
          <CardContent>
            <MyTable TableHead={TablePageHeading} TableContent={tableData} />
          </CardContent>
        </Card>
      </Page>
    </div>
  );
}

export default DecorationForm;