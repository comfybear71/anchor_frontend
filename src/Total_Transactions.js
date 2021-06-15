import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Link from "@material-ui/core/Link";
import Title from "./Title";
import Axios from 'axios';
import { InfoContext } from './context/InfoContext'

const columns = [
    { id: 'amount', label:'amount', maxWidth: 3},
    { id: 'transaction_type', label:'transaction', minWidth: 8},
    { id: 'txHash', label: 'txHash', minWidth: 10 },
    { id: 'date', label: 'Date', minWidth: 10, align: 'right'}
];

let theArray = []

const useStyles = makeStyles({
root: {
    width: '100%',
},
container: {
    maxHeight: 440,
},
});

export default function Transactions(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [info, setInfo] = useContext(InfoContext);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    useEffect(() => {
        console.log(props.value)
        
        if (props.value){
            
            const getTableData = () => {

                Axios.get(`https://anchorgold-server.herokuapp.com/api/transactions/${info.wallet}`)
                .then(resp => {
                    
                    for (var i = 0; i < resp.data.length; i++) {

                        function makeURL(val){
                            var str = val
                            var res = str.substring(0,6)
                            var resLength = str.length
                            var resLast = str.substring((resLength-6), resLength)
                            
                            var url = `https://finder.terra.money/tequila-0004/tx/${val}`
                            var shortenedTXHash = res +  "..." + resLast
                            return <Link href={url}>{shortenedTXHash}</Link>
                        }
                        
                        const newItem = {
                            amount: resp.data[i].amount,
                            transaction_type: resp.data[i].transaction_type,
                            txHash:  makeURL(resp.data[i].txHash),  //resp.data[i].txHash, 
                            date: resp.data[i].created_at
                        }
                        theArray.push(newItem)
                    }
                    
                })
            }
            getTableData()
        }
        
    },[props.value, info.wallet])
    

    return (
        <>
            <Title>TRANSACTION HISTORY</Title>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {theArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                        count={theArray.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
