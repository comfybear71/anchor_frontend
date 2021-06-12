import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
    depositContext: {
        flex: 1
    }
});

export default function Total_Expected() {
    const classes = useStyles();
    const [alignment, setAlignment] = React.useState('left');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    return (
        <>
            <Title>EXPECTED INTEREST</Title>
            <Typography variant="h4" color="textSecondary" component="p">
                24.65 UST
            </Typography>
            <Box pt={4} align="center">
                <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleChange}>
                    <ToggleButton value="year">
                        <Typography fontSize='1rem' color="textSecondary">YEAR</Typography>
                    </ToggleButton>
                    <ToggleButton value="month">
                        <Typography fontSize='1rem' color="textSecondary">MONTH</Typography>
                    </ToggleButton>
                    <ToggleButton value="week">
                        <Typography fontSize='1rem' color="textSecondary">WEEK</Typography>
                    </ToggleButton>
                    <ToggleButton value="day">
                        <Typography fontSize='1rem' color="textSecondary">DAY</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
}
