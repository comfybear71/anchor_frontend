import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ComingSoon from './ComingSoon'
import Copyright from './Copyright'
import { InfoContext } from './context/InfoContext'

import Prices from './Prices'
import Gold from './Gold'
import Silver from './Silver'
import Platinum from './Platinum'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
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


const Earn = () => {
    const classes = useStyles();
    const [info, setInfo] = useContext(InfoContext);

    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
        
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Prices />
                </Grid>
            </Container>

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/*GOLD  */}
                    <Grid item xs={12} md={4} lg={4}>
                        <Gold rewards={info.reward}/>
                    </Grid>

                    {/* SILVER */}
                    <Grid item xs={12} md={4} lg={4}>
                        <Silver rewards={info.reward}/>
                    </Grid>

                    {/* PLATINUM */}
                    <Grid item xs={12} md={4} lg={47} className={classes.item2}>
                        <Platinum rewards={info.reward}/>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <ComingSoon />
                </Grid>
            </Container>
            
            <Copyright blockHeight={info.height} />
        </div>
    )
}

export default Earn