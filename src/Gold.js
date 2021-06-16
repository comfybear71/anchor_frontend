import React, {useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress'
import { styled } from '@material-ui/core/styles';
import { InfoContext } from './context/InfoContext'
import Box from '@material-ui/core/Box';
import Title from './Title'
import Popover from '@material-ui/core/Popover';
import { Button } from '@material-ui/core'
import { yellow, grey, red, green } from "@material-ui/core/colors";
import { withStyles, createStyles } from "@material-ui/core/styles";
import gold from './images/gold_image.png'
import goldFront1gmFront from './images/gold_front_1gm.png'
import goldFront1gmBack from './images/gold_back_1gm.png'
import Tooltip from '@material-ui/core/Tooltip';

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
            backgroundColor: yellow[300],
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

const Gold = (props) => {
    const classes = useStyles();
    const [info, setInfo] = useContext(InfoContext);
    const [goldPrice, setGoldPrice] = useState({
        oneGM: 92.31,
        fiveGM: 429.41,
        tenGM: 824.81,
        twentyGM: 1601.21,
        oneOUNCE: 2466.68
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

    return (
        <>
            <Card elevation={7} className={classes.fixedCardHeight}>
                <CardContent>
                    <Box border={0} display="flex" alignItems="center" justifyContent="space-between" >
                        <Box border={0}>
                            <Title>GOLD</Title>
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
                            <Typography variant="subtitle1" display="inline">
                                
                            </Typography>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">1gm of Solid Gold</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={goldFront1gmFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={goldFront1gmBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${goldPrice.oneGM}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((goldPrice.oneGM-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                <Typography variant="subtitle1" display="inline">
                                    1gm
                                </Typography>
                            </HtmlTooltip>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">5gm of Solid Gold</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={goldFront1gmFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={goldFront1gmBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${goldPrice.fiveGM}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((goldPrice.fiveGM-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                <Typography variant="subtitle1" display="inline">
                                    5gm
                                </Typography>
                            </HtmlTooltip>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">10gm of Solid Gold</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={goldFront1gmFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={goldFront1gmBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${goldPrice.tenGM}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((goldPrice.tenGM-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                <Typography variant="subtitle1" display="inline">
                                    10gm
                                </Typography>
                            </HtmlTooltip>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">20gm of Solid Gold</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={goldFront1gmFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={goldFront1gmBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${goldPrice.twentyGM}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((goldPrice.twentyGM-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                <Typography variant="subtitle1" display="inline">
                                    20gm
                                </Typography>
                            </HtmlTooltip>
                        </Box>
                        <Box border={0} width="100%" >
                            <HtmlTooltip
                                title={
                                    <>
                                        <Box border={0} align="center"><Typography color="inherit">1oz of Solid Gold</Typography></Box>
                                        <Box border={0} display="flex" align="center" justifyContent="space-evenly">
                                            <img src={goldFront1gmFront} alt="Anchor.Gold!" className={classes.logo} />
                                            <img src={goldFront1gmBack} alt="Anchor.Gold!" className={classes.logo} />
                                        </Box>
                                        <Box border={0} align="center"><Typography color="inherit">Prices at ${goldPrice.oneOUNCE}</Typography></Box>
                                        <Box border={0} align="center"><GreenTextTypography variant="h6" >Rewards:{`$${Math.round(((props.rewards)+Number.EPSILON) * 100) / 100}`}</GreenTextTypography></Box>
                                        <Box border={0} align="center"><RedTextTypography variant="subtitle1" >{`$${Math.round(((goldPrice.oneOUNCE-props.rewards)+Number.EPSILON) * 100) / 100}`} to go</RedTextTypography></Box>
                                        
                                    </>
                                }
                            >
                                <Typography variant="subtitle1" display="inline">
                                    1oz
                                </Typography>
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

export default Gold
