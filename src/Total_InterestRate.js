import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";
import { green } from "@material-ui/core/colors";


const useStyles = makeStyles({
    depositContext: {
        flex: 1
    },
});

const GreenTextTypography = withStyles({
    root: {
        color: green[400]
    }
  })(Typography);

export default function Total_InterestRate() {
    // const classes = useStyles();
    return (
        <>
            <Title>INTEREST RATE</Title>
            <GreenTextTypography variant="h2" component="h2">
                20.52% 
            </GreenTextTypography>

            <Box pt={4} align="center">
            
            </Box>
        </>
    );
}
