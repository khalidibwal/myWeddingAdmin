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
import CategoryTable from 'src/components/tables/CategoryTable';

function CategoryForm() {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [myUsername, setMyusername] = useState('');
  const [authenticated, setauthenticated] = useState(null);
  const [myCategory, setMyCategory] = useState('');
  const [myPackage, setMyPackage] = useState('');
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
    category_name : myCategory,
    package : myPackage
  };

  const TablePageHeading = [
    {text:'Nama Kategori'},
    {text:'Nama Paket'}
  ]

  const getTableData = async() =>{
    await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/category`,{
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

  const handleCategory = (e) => {
    setMyCategory(e.target.value);
  };
  const handlePackage = (e) => {
    setMyPackage(e.target.value);
  };

  const onSubmit = (e) => { 
    e.preventDefault();
    axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/category`, defaultValues).then((response) => {
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
                    label="Nama kategori"
                    variant="outlined"
                    name="category_name"
                    onChange={handleCategory}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Nama Paket"
                    variant="outlined"
                    name="location"
                    onChange={handlePackage}
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
            <CategoryTable TableHead={TablePageHeading} TableContent={tableData} />
          </CardContent>
        </Card>
      </Page>
    </div>
  );
}

export default CategoryForm;
