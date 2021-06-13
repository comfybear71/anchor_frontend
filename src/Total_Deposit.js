import React, {useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { Button } from '@material-ui/core'
import Box from "@material-ui/core/Box";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: 10,
        borderRadius: 20,
        width: '40%',
        padding: 5
    },
    dialogPaper: {
        height : 'auto',
        width : '800px',
        borderRadius : '25px',

    },
    input: {
        marginLeft: 5,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    buttonDeposit: {
        margin: 10,
        borderRadius: 20,
        width: '20%',
        padding: 5,
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
    
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Total_Deposit(props) {
    const classes = useStyles();
    const [amount, setAmount] = useState();
    const [mnenmonic, setMnemonic] = useState('');
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [status, setStatus] = useState();
    const [txFee, setTxFee] = useState();
    const [txDetails, setTxDetails] = useState()

    const handleClickOpenDeposit = () => {
        setOpenDeposit(!openDeposit);
    };
    
    const handleClickOpenWithdraw = () => {
        setOpenWithdraw(!openWithdraw);
    };

    const addDeposit = () => {
        if(value != null) {
            if(amount && mnenmonic) {
                try {
                    const anchorEarn = new AnchorEarn({
                        chain: CHAINS.TERRA,
                        network: NETWORKS.TEQUILA_0004,
                        address: value,
                        mnemonic: mnenmonic
                    });

                    async function depositData() {
                        try {
                            const deposit = await anchorEarn.deposit({
                                amount: amount, 
                                currency: DENOMS.UST
                            });

                            console.log("TXOUTPUT-DEPOSIT", deposit)

                            const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                            const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });
        
                            setStatus(deposit.status)
                            setTxFee(deposit.txFee)
                            setTxDetails(deposit.txDetails[0].txHash)
                            setInfo({
                                balance: balanceInfo.balances[0].account_balance,
                                deposit: balanceInfo.balances[0].deposit_balance,
                                height: balanceInfo.height,
                                liquidity: market.markets[0].liquidity,
                                APY: market.markets[0].APY
                            })

                            Axios.post(`https://anchorgold-server.herokuapp.com/api/transactions/${value}/transactions`, {
                        wallet: value,
                        transaction_type:"deposit",
                        amount: amount,
                        txHash: deposit.txDetails[0].txHash
                    })
                    
                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        
                        Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${value}`, {
                            "ustBalance":parseFloat(amount, 10) + parseFloat(resp.data.ustBalance, 10)
                        })
                        
                    })
                    .catch(err => {
                        console.log( err, "ERROR GETTING BALANCE")
                    })

                } catch (err) {
                    alert(err)
                }
                finally {
                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        console.log(resp.data.ustBalance)
                        setUserBalance(resp.data.ustBalance)
                        
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                }
            }
            depositData(); 

                } catch(err) {
                    alert(err)
                }

            } else {
                alert('No data')
            }
            handleClickOpenDeposit()
        } else {
            alert('Connect Wallet')
            handleClickOpenDeposit()
        }
            
        }


    return (
        <>
            <Title>TOTAL DEPOSIT</Title>
            <Typography variant="h4" color="textSecondary" component="p">
                {parseFloat(props.deposit).toFixed(6)} UST
            </Typography>
            <Box pt={4} align="center" >
                <Button onClick={handleClickOpenDeposit} variant="contained" className={classes.button} size="small" color="primary">
                    Deposit
                </Button>
                <Button onClick={handleClickOpenWithdraw} variant="contained" className={classes.button} size="small" color="primary">
                    Withdraw
                </Button>
            </Box>

            {/* DEPOSIT */}
            <Dialog
                className={classes.dialog}
                open={openDeposit}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickOpenDeposit}
                classes={{ paper : classes.dialogPaper}}
                maxWidth={'xl'}

            >
                <Box className={classes.box} m={5} >
                    <DialogTitle id="alert-dialog-slide-title"><Title>DEPOSIT</Title></DialogTitle>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            <TextField 
                                type="number"
                                fullWidth={true}  
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                label="Amount"  
                            /><FormHelperText id="my-helper-text">UST BALANCE: </FormHelperText>
                        </Box>
                    </Box>

                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            <TextField 
                                
                                fullWidth={true}  
                                value={mnenmonic}
                                onChange={e => setMnemonic(e.target.value)}
                                label="Menonmic" 
                                
                            /><FormHelperText id="my-helper-text">Paste Mnenomic</FormHelperText>
                        </Box>
                    </Box>
                    
                    <Box pt={4} align="center" >
                        <Button onClick={addDeposit} variant="contained" className={classes.button} size="large" color="primary">
                            Deposit
                        </Button>
                    </Box>
                </Box>
            </Dialog>

            {/* WITHDRAW */}
            <Dialog
                className={classes.dialog}
                open={openWithdraw}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickOpenWithdraw}
                classes={{ paper : classes.dialogPaper}}
                maxWidth={'xl'}

            >
                <Box className={classes.box} m={5} >
                    <DialogTitle id="alert-dialog-slide-title"><Title>WITHDRAW</Title></DialogTitle>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            <TextField 
                                type="number"
                                fullWidth={true}  
                                label="Amount"  
                            /><FormHelperText id="my-helper-text">UST BALANCE: </FormHelperText>
                        </Box>
                    </Box>
                    
                    <Box pt={4} align="center" >
                        <Button onClick={handleClickOpenWithdraw} variant="contained" className={classes.button} size="large" color="primary">
                            Withdraw
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
