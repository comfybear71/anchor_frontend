import React, {useState, useContext, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Title from "./Title";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import { RewardContext } from './context/RewardContext'
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'
import { Extension } from '@terra-money/terra.js';

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
    margin: {
        margin: theme.spacing(0.5),
    },
    fixedHeight: {
        height: 120
    },
    appBarSpacer: theme.mixins.toolbar,
    
    logo: {
        maxWidth: 40,
        marginRight: '10px'
    },
    sub_title: {
        textAlign: 'center'
    },
    content: {
        backgroundColor: '#263211'
    },
    dialog: {
        [theme.breakpoints.down('sm')]: {
            "& .MuiDialog-container .MuiDialog-paper": {
                margin: "0px 0px",
                borderRadius: '25px',
                height: '440px',
                // position: "absolute", left: "0%", top: "50%", transform: "translate(-75%,-50%)"
                transform: "translate(0%, 50%) !important"
            },
        }
    },
    dialogPaper: {
        height : 'auto',
        width : '800px',
        borderRadius : '25px',

    },
    button: {
        margin: 10,
        borderRadius: 20,
        // width: '5%',
        // padding: 5
    },
    buttonChrome: {
        margin: 10,
        borderRadius: 20,
        width: '100%',
        padding: 5
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    grid : {
        flex: 1,
        textAlign: 'center',
        alignContent: 'center'
    },
    popover: {
        pointerEvents: 'none',
    },
    
})
);


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const  WalletMenuIcon = (props) => {
    const classes = useStyles();

    const [value, setValue] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [wallet, setWallet] = useState();
    const [openWallet, setOpenWallet] = useState(false);

    const handleClickOpenWallet = () => {
        setOpenWallet(!openWallet);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const ext = new Extension();
    const connect = () => {
        ext.connect();
        ext.on("onConnect", setWallet);
        handleClickOpenWallet()

    }

    useEffect(() => {
        if(value != null){

            const anchorEarn = new AnchorEarn({
                name: "testnet",
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value
            });

            async function fetchData() {
                const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                    // Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    // .then(resp => {
                    //     setUserBalance(resp.data.ustBalance)
                    //     setRewards(balanceInfo.balances[0].deposit_balance - resp.data.ustBalance)
                    // })
                    // .catch(err => {
                    //     console.log(err)
                    // })
                
                setInfo({
                    balance: balanceInfo.balances[0].account_balance,
                    deposit: balanceInfo.balances[0].deposit_balance,

                    height: balanceInfo.height,
                    liquidity: market.markets[0].liquidity,
                    APY: market.markets[0].APY
                })
            }
            fetchData(); 
        }
    })

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickOpenWallet}
                color="inherit"
            >
                <AccountBalanceWalletTwoToneIcon />
            </IconButton>

            <Dialog
                className={classes.dialog}
                open={openWallet}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickOpenWallet}
                classes={{ paper : classes.dialogPaper}}
                maxWidth={'xl'}
            >
                <Box className={classes.box} m={2} >
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6" className={classes.sub_title}><Title>Connect Wallet</Title></Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={12} lg={12} className={classes.grid} >
                                <Box display="flex" justifyContent="space-between">
                                    <TextField
                                        label="Wallet Address"
                                        inputProps={{ className: classes.textarea }}
                                        style= {{width: '70%'}}
                                    />
                                <Button 
                                    onClick={handleClickOpenWallet}
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<AccountBalanceWalletTwoToneIcon />}
                                >Engage</Button>
                                </Box>
                            
                            </Grid>
                        </Grid>
                    </Container>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12} className={classes.grid} >
                            <Box display="flex" justifyContent="center"  >
                                <Button 
                                    onClick={wallet ? undefined : connect}
                                    variant="contained" 
                                    className={classes.buttonChrome} 
                                    size="large" 
                                    color="primary"
                                    endIcon={<InfoOutlinedIcon 
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={handlePopoverOpen}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                    }
                                    
                                >   
                                    {!wallet && "Connect Chrome Extension"}
                                    {setValue(wallet?.address)}
                                    
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Dialog>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography p={2}>***Chrome Extension only available on Google Chrome or Brave...  </Typography>
            </Popover>
          
    </>
    )
}

export default WalletMenuIcon
