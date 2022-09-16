import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function CateringTable(props) {
  console.log(props);
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
            return (
              <>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                  <TableCell scope="row">{table.ctr_name}</TableCell>
                  {table.category.map((response) => {
                    return <TableCell scope="row">{response.package}</TableCell>;
                  })}
                  {table.packages.map((response) => {
                    return <TableCell scope="row">{response.ctg_name}</TableCell>;
                  })}               
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CateringTable;
