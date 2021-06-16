import react, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
    sub_title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(0.5),
    },
    customBorderRadius: {
        borderRadius: 16,
        
    },
    fixedCardHeight: {
        height: 200,
        borderRadius: 16,
    },
    appBarSpacer: {
        margin: theme.spacing(1.5),
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240,
        borderRadius: 16,
    },
    item2: {
        order: 3,
        [theme.breakpoints.up('sm')]: {
            order: 2,
        },
    },
    item3: {
        order: 2,
        [theme.breakpoints.up('sm')]: {
            order: 3,
        },
    },
    fixedTableHeight: {
        height: 'auto',
        borderRadius: 16,
    },
    popover: {
        pointerEvents: 'none',
    },  
    button: {
        margin: 10,
        borderRadius: 20,
        width: '40%',
        padding: 5
    },
})
);

const Prices = () => {
    const [gold, setGold] = useState()
    const [silver, setSilver] = useState()
    const [platinum, setPlatinum] = useState()
    const classes = useStyles();

    useEffect(() =>{
        getPrices();
    }, [])

    const getPrices = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-2zyhxd0ukp0mz0ip-io");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
        .then(resp => resp.json())
        .then(result => 
            setGold(result.price))
        .catch(error => console.log('error', error));

        fetch('https://www.goldapi.io/api/XAG/USD', requestOptions)
        .then(response => response.json())
        .then(result => 
            setSilver(result.price))
        .catch(error => console.log('error', error));

        fetch('https://www.goldapi.io/api/XPT/USD', requestOptions)
        .then(response => response.json())
        .then(result => 
            setPlatinum(result.price))
        .catch(error => console.log('error', error));
    }

    return (
        <>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>GOLD</Typography>
                    <Typography variant="h6" className={classes.sub_title}>{parseFloat(0).toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>SILVER</Typography>
                    <Typography variant="h6" className={classes.sub_title}>{parseFloat(0).toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>PLATINUM</Typography>
                    <Typography variant="h6" className={classes.sub_title}>{parseFloat(0).toFixed(6)}</Typography>
                </Paper>
            </Grid>
        </>
    )

}

export default Prices