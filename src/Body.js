import React, {useContext, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { green, red } from "@material-ui/core/colors";

import Copyright from './Copyright'
import TotalDeposit from './Total_Deposit'
import TotalInterest from './Total_InterestRate'
import TotalExpected from './Total_Expected'
import TotalTransactions from './Total_Transactions'

import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import WalletTest from './WalletTest'


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
    }
})
);

const RedArrow = withStyles({
    root: {
        color: red[400]
    }
})(ArrowDownwardIcon);

const GreenArrow = withStyles({
    root: {
        color: green[400]
    }
})(ArrowUpwardIcon);


const Body = () => {
    const classes = useStyles();
    const [value, setValue] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);

    useEffect(() => {
        <WalletTest value={value} />
    },[])
 
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
        
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={4} md={4} lg={4}>
                        <Paper className={classes.customBorderRadius} elevation={7}>
                            <Typography variant="h6" className={classes.sub_title}>UST BALANCE<RedArrow /></Typography>
                            <Typography variant="h6" className={classes.sub_title}>{info.balance}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Paper className={classes.customBorderRadius} elevation={7}>
                            <Typography variant="h6" className={classes.sub_title}>EARNING %<GreenArrow /></Typography>
                            <Typography variant="h6" className={classes.sub_title}>{info.deposit}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Paper className={classes.customBorderRadius} elevation={7}>
                            <Typography variant="h6" className={classes.sub_title}>REWARDS<GreenArrow /></Typography>
                            <Typography variant="h6" className={classes.sub_title}>{userBalance}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>


            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    {/*DEPOSITS  */}
                    <Grid item xs={12} md={7} lg={7}>
                        <Card elevation={7} className={classes.fixedCardHeight}>
                            <CardContent>
                                <TotalDeposit deposit={info.deposit} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* INTERST RATE */}
                    <Grid item xs={12} md={5} lg={5}>
                        <Card elevation={7} className={classes.fixedCardHeight}>
                            <CardContent>
                                <TotalInterest interest={info.APY} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* HISTORY  PASSPROPS FROM AXIOS */}
                    <Grid item xs={12} md={7} lg={7} className={classes.item2}>
                        <Card elevation={7} className={classes.fixedTableHeight}>
                            <CardContent>
                                <TotalTransactions /> 
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* EXPECTED INTERST */}
                    <Grid item xs={12} md={5} lg={5} className={classes.item3}>
                        <Card elevation={7}  className={classes.fixedTableHeight}>
                            <CardContent >
                                <TotalExpected />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            
            <Copyright blockHeight={info.height} />
        </div>
    )
}

export default Body