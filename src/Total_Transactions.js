import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Link from "@material-ui/core/Link";

const columns = [
    { id: 'amount', label:'amount', maxWidth: 3},
    { id: 'transaction', label:'transaction', minWidth: 8},
    { id: 'txHash', label: 'txHash', minWidth: 10 },
    { id: 'date', label: 'Date', minWidth: 10, align: 'right'}
];

function createData(amount, transaction, txHash, date) {
    return { amount, transaction, txHash, date };
}

const rows = [
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Withdraw', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Purchase', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Withdraw', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Withdraw', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    createData('+78','Deposit', <Link color="inherit" href="https://finder.terra.money/tequila-0004/tx/B5F484BFBFC1BDE4750F3199860D7696CD9F022029ACAA875100D82378743E7A">B5F484...8743E7A</Link>, '25/07/2021'),
    
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Transactions() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
            labelRowsPerPage = ''
            rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
