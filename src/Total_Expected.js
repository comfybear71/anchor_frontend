import React, {useState, useContext, useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { InfoContext } from './context/InfoContext'
import { yellow } from "@material-ui/core/colors";
// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1
    },
    button: {
        // margin: 10,
        borderRadius: 20,
        width: '40%',
        padding: 5,
        color: yellow[500]
    },
}))

const ColorToggleButton = withStyles((theme) => ({
    // root: {
    //     color: theme.palette.getContrastText(yellow[500]),
    //     borderColor: yellow[500],
        
    //     '&:hover': {
    //         backgroundColor: yellow[700],
    //         color: '#fff'
    //     },
    // },
}))(ToggleButton);

export default function Total_Expected(props) {
    const classes = useStyles();
    const [alignment, setAlignment] = React.useState('day');
    const [a, setA]= useState('0.00')
    const [info, setInfo] = useContext(InfoContext);

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const handleYear = () => {
        setA(props.apy * info.initBalance)
    }
    const handleMonth = () => {
        setA((props.apy * info.initBalance)/12)
    }
    const handleWeek = () => {
        setA((props.apy * info.initBalance)/52)
    }
    const handleDay = () => {
        setA((props.apy * info.initBalance)/365)
    }



    return (
        <>
            <Title>EXPECTED INTEREST</Title>
            <Typography variant="h4" color="textSecondary" component="p">
                {parseFloat(a).toFixed(2)} UST
            </Typography>
            <Box pt={4} align="center">
                <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleChange}>
                    <ColorToggleButton className={classes.button} onClick={handleYear} value="year" color="primary">
                        <Typography fontSize='1rem' color="textSecondary">YEAR</Typography>
                    </ColorToggleButton>
                    <ColorToggleButton className={classes.button} onClick={handleMonth} value="month" >
                        <Typography fontSize='1rem' color="textSecondary">MONTH</Typography>
                    </ColorToggleButton>
                    <ColorToggleButton className={classes.button} onClick={handleWeek} value="week">
                        <Typography fontSize='1rem' color="textSecondary">WEEK</Typography>
                    </ColorToggleButton>
                    <ColorToggleButton className={classes.button} onClick={handleDay} value="day">
                        <Typography fontSize='1rem' color="textSecondary">DAY</Typography>
                    </ColorToggleButton>
                </ToggleButtonGroup>
            </Box>
            
        </>
    );
}
