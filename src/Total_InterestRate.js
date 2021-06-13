import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { green } from "@material-ui/core/colors";


const GreenTextTypography = withStyles({
    root: {
        color: green[400]
    }
  })(Typography);

export default function Total_InterestRate(props) {

    return (
        <>
            <Title>INTEREST RATE</Title>
            <GreenTextTypography variant="h2" component="h2">
                {parseFloat(props.interest * 100).toFixed(2)}%
            </GreenTextTypography>
        </>
    );
}
