import React, {useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress'
import { InfoContext } from './context/InfoContext'
import Box from '@material-ui/core/Box';
import Title from './Title'
import { Button } from '@material-ui/core'
import { yellow, grey, red, green } from "@material-ui/core/colors";
import { withStyles, createStyles } from "@material-ui/core/styles";
import gold from './images/silver_image.png'
import silverFront1ozFront from './images/silver_front_1oz.png'
import silverFront1ozBack from './images/silver_back_1oz.png'
import silverFront1kg from './images/silver_front_1kg.png'
import silverBack1kg from './images/silver_back_1kg.png'
import Tooltip from '@material-ui/core/Tooltip';
import {isMobile} from 'react-device-detect';

const BorderLinearProgress = withStyles((theme) =>
    createStyles({
        root: {
            width: '95%',
            height: 15,
            borderRadius: 15,
            marginTop: 0,
            marginBottom: 0,
            variant: "determinate"
        },
        colorPrimary: {
            backgroundColor: green[300],
        },
        bar: {
            borderRadius: 2,
            backgroundColor: grey[900],
        },
    }),
)(LinearProgress);

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
    logo: {
        maxWidth: 120,
        height: 60
    },
   
})
);

const Silver = (props) => {
    const classes = useStyles();
    const [silverPrice, setSilverPrice] = useState({
        oneOUNCE: 40.64,
        oneKILO: 1225.15
    })

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: yellow[50],
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '2px solid #111',
            borderRadius: 10
        },
    }))(Tooltip);

    const GreenTextTypography = withStyles({
        root: {
            color: green[500]
        }
    })(Typography);

    const RedTextTypography = withStyles({
        root: {
            color: red[500]
        }
    })(Typography);

    const smallRoundButtons = withStyles({
        button: {
            borderRadius: 10,
            width: 5
        }
    })(Button);

    const changeToolTips = (val) => {

        if(isMobile){
            return (
                <Typography variant="subtitle1" display="inline">
                    {val}
                </Typography>
            )
            
        } else {
            return (
                <Typography variant="subtitle1" display="inline">
                    {val}
                </Typography>
            )
        }
    }

   

    return (
        <>
            <Card elevation={7} className={classes.fixedCardHeight}>
                <CardContent>
                    <Box border={0} display="flex" alignItems="center" justifyContent="space-between" >
                        <Box border={0}>
                            <Title >SILVER</Title>
                        </Box>
                        <Box border={0}>
                            <img src={gold} alt="Anchor.Gold!" className={classes.logo} />
                        </Box>
                    </Box>
                    <Box border={0} display="flex" alignItems="center">
                        <Box border={0} width="100%" mr={1}>
                            <BorderLinearProgress variant="determinate"  value={props.rewards} >
                            <Typography  variant="body2" color="textSecondary">{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</Typography>
                            </BorderLinearProgress>
                        </Box>
                    </Box>
                    <Box border={0} display="flex" justify='space-evenly' mt={2}>
                        <Box border={0} width="100%" > 
                            <Typography variant="subtitle1" display="inline"></Typography>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">1oz of minted Silver</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={silverFront1ozFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={silverFront1ozBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${silverPrice.oneOUNCE}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((silverPrice.oneOUNCE-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                {changeToolTips('1oz')}
                                {/* <Typography variant="subtitle1" display="inline">
                                    1oz
                                </Typography> */}
                            </HtmlTooltip>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">1kg of minted Silver</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={silverFront1kg} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={silverBack1kg} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${silverPrice.oneKILO}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((silverPrice.oneKILO-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                {changeToolTips('1kg')}
                                {/* <Typography variant="subtitle1" display="inline">
                                    1kg
                                </Typography> */}
                            </HtmlTooltip>
                        </Box>

                    </Box>
                    <Box border={0} display="flex" alignItems="center" justifyContent="space-evenly" mt={1}>
                        <Typography variant="h6" >
                            Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}
                        </Typography>

                        <Button className= {classes.button} variant="contained" size="small" color="primary">
                            Engage
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Silver
