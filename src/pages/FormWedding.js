import { Card, TextField, Grid, Stack, Button } from '@mui/material';
  import { Container } from '@mui/system';
import React from 'react'
import Page from '../components/Page';
import Label from '../components/Label';



function FormWedding() {
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
            <Button variant="contained">Kirim</Button>
            </Stack>
          </Container>
        </Card>
      </Page>
    </div>
  );
};

export default FormWedding;