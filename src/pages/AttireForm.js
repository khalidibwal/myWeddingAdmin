// import { UserContext } from 'src/contextProvider/UserContext';
import swal from 'sweetalert';
import { Card, CardContent, TextField, Grid, Stack, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/system';
import { UserContext } from 'src/contextProv/UserContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Page from '../components/Page';
import Label from '../components/Label';
import AttireTable from 'src/components/tables/AttireTable';

function AttireForm() {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [myUsername, setMyusername] = useState('');
  const [authenticated, setauthenticated] = useState(null);
  const [myAttire, setMyAttire] = useState('');
  const [myPackage, setMyPackage] = useState('');
  const [packageData, setPackageData] = useState([]);
  const [myCategory, setMyCategory] = useState('');
  const [ctgData, setCtgData] = useState([]);
  const [tableData, setTable] = useState([]);
  const { dataName, setdataname } = useContext(UserContext);
  const { userEmail, setUserEmail } = useContext(UserContext);
  const { myweddingid, setmyweddingid } = useContext(UserContext);
  const { userid, setuserid } = useContext(UserContext);

  useEffect(() => {
    const getToken = localStorage.getItem('myToken');
    const getPackageID = () => {
      axios
        .get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/category`)
        .then((response) => {
          if (response.status === 200) {
            setPackageData(response.data);
            console.log(response);
          }
        })
        .catch((error) => console.log(error));
    };
    const getCategoryID = () => {
      axios
        .get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/packages`)
        .then((response) => {
          if (response.status === 200) {
            setCtgData(response.data);
            console.log(response);
          }
        })
        .catch((error) => console.log(error));
    };

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
    getPackageID();
    getCategoryID();
  }, [userid]);

  const defaultValues = {
    mua: myAttire,
    wo_desc_id: myweddingid,
    users_id: userid,
    packages_id: myCategory,
    category_id: myPackage,
  };

  const TablePageHeading = [{ text: 'MakeUp Rias' }, { text: 'Nama paket' }, { text: 'Nama Kategori' }];

  const getTableData = async () => {
    await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/attire`,{
      params:{
        users_id: userid
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data,'attire')
        setTable(response.data);
      }
    });
  };

  const handleAttire = (e) => {
    setMyAttire(e.target.value);
  };
  const handlePackage = (e) => {
    setMyPackage(e.target.value);
  };
  const handleCategory = (e) => {
    setMyCategory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/attire`, defaultValues).then((response) => {
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
                    label="Nama Rias"
                    variant="outlined"
                    name="mua"
                    onChange={handleAttire}
                  />
                  <InputLabel id="demo-simple-select-label">Nama Paket</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    name="packages_id"
                    id="demo-multiple-name"
                    value={myPackage}
                    onChange={handlePackage}
                  >
                    {packageData.map((name) => (
                      <MenuItem key={name.id} value={name.id}>
                        {name.package}
                      </MenuItem>
                    ))}
                  </Select>
                  <InputLabel id="demo-simple-select-label">Nama Kategori</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    name="category_id"
                    id="demo-multiple-name"
                    value={myCategory}
                    onChange={handleCategory}
                  >
                    {ctgData.map((name) => (
                      <MenuItem key={name.id} value={name.id}>
                        {name.ctg_name}
                      </MenuItem>
                    ))}
                  </Select>

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
            <AttireTable TableHead={TablePageHeading} TableContent={tableData} />
          </CardContent>
        </Card>
      </Page>
    </div>
  );
}

export default AttireForm;
