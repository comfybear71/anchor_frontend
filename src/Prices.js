import {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

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
    const classes = useStyles();

    useEffect(() =>{
        getPrices();
    }, [])

    const getPrices = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-2zyhxd0ukp0mz0ip-io");
        myHeaders.append("Content-Type", "application/json");

        Axios.get('https://data-asg.goldprice.org/dbXRates/USD')
        .then(resp => {
            setGold(resp.data.items[0].xauPrice)
            setSilver(resp.data.items[0].xagPrice)
        })
        .catch(error => console.log('error', error))
    }

    return (
        <>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>GOLD</Typography>
                    <Typography variant="h6" className={classes.sub_title}>{parseFloat(gold).toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>SILVER</Typography>
                    <Typography variant="h6" className={classes.sub_title}>{parseFloat(silver).toFixed(2)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={7}>
                    <Typography variant="h6" className={classes.sub_title}>PLATINUM</Typography>
                    <Typography variant="h6" className={classes.sub_title}>1152.13</Typography>
                </Paper>
            </Grid>
        </>
    )
}

export default Prices