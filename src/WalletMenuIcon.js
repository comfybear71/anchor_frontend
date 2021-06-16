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
import { InfoContext } from './context/InfoContext'
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'
import { Extension } from '@terra-money/terra.js';
import {isMobile} from 'react-device-detect';


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
    const [info, setInfo] = useContext(InfoContext);
    const [wallet, setWallet] = useLocalStorage("wallet_address", "");
    const [openWallet, setOpenWallet] = useState(false);

    const handleClickOpenWallet = () => {
        setOpenWallet(!openWallet);
    };

    const connect = () => {

        const ext = new Extension();
        if(isMobile){
            connectWebWallet()
        }
        ext.connect();
        ext.on("onConnect", setWallet);
    }

    const connectWebWallet = () => {
        setWallet({address: info.wallet})
        handleClickOpenWallet()
    }

    useEffect(() => {

        if(wallet.address){
            const anchorEarn = new AnchorEarn({
                name: "testnet",
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: wallet.address
            });

            async function fetchData() {
                const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                await Axios.post(`https://anchorgold-server.herokuapp.com/api/users`, {
                    wallet: wallet.address,
                    ustBalance: 0
                }).then(resp => {
                    
                })
                .catch(err => {
                    console.log( 'WALLET ALREADY EXISTS, PATCHING BALANCE' )
                })

                await Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${wallet.address}`)
                .then(resp => {

                    setInfo({
                        balance: balanceInfo.balances[0].account_balance,
                        deposit: balanceInfo.balances[0].deposit_balance,
                        height: balanceInfo.height,
                        liquidity: market.markets[0].liquidity,
                        APY: market.markets[0].APY,
                        wallet: wallet.address,
                        reward: balanceInfo.balances[0].deposit_balance - resp.data.ustBalance, 
                        initBalance: resp.data.ustBalance
                    })
                })
                .catch(err => {
                    console.log( 'SUM FUCKING ERROR' )
                })
            }
            fetchData(); 
        }
    }, []);

    // Hook
    function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
        } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
            value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
        }
    };
    return [storedValue, setValue];
    }

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={connect}
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
                                        value={info.wallet}
                                        onChange={e => setInfo({wallet: e.target.value})}
                                    />
                                <Button 
                                    onClick={connectWebWallet}
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
                </Box>
            </Dialog>
        </>
    )
}

export default WalletMenuIcon
