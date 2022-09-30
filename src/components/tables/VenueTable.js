import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function currencyFormat(num) {
  return 'Rp.' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const DeleteData = id => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:_G_SfNPu/venue/${id}`)
       setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      swal("Your file is safe!");
    }
  });
} 


function MyTable(props) {

  return (
    <TableContainer sx={{ maxHeight: 500, overflow: 'scroll' }} component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {props.TableHead.map((table) => {
              return <TableCell>{table.text}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.TableContent.map((table) => {
            // console.log(table,'table')
            return (
              <>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                  <TableCell scope="row">{table.building_name}</TableCell>
                  <TableCell scope="row">{table.location}</TableCell>
                  <TableCell scope="row">{currencyFormat(table.price)}</TableCell>
                  <TableCell scope="row">
                    <Link to={`login`}>
                    <Button variant="contained" color="primary">
                      Ubah Data
                    </Button>
                    </Link>
                    
                    <Button variant="contained" color="error" onClick={()=> DeleteData(table.id)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
