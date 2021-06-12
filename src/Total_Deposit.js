import React from "react";
// import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { Button } from '@material-ui/core'
import Box from "@material-ui/core/Box";

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
  button: {
    margin: 10,
    borderRadius: 20,
    width: '40%',
    padding: 5
},
});

export default function Total_Deposit() {
    const classes = useStyles();
    return (
        <>
            <Title>TOTAL DEPOSIT</Title>
            <Typography variant="h4" color="textSecondary" component="p">
                6,539.963 UST
            </Typography>
            <Box pt={4} align="center">
                <Button variant="contained" className={classes.button} size="small" color="primary">
                    Deposit
                </Button>
                <Button variant="contained" className={classes.button} size="small" color="primary">
                    Withdraw
                </Button>
            </Box>
        </>
    );
}
