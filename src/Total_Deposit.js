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
import { InfoContext } from './context/InfoContext'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import Axios from 'axios';
import {useStyles} from './styles.js'
import Backdrop from '@material-ui/core/Backdrop';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Total_Deposit(props) {
    const classes = useStyles(props);
    const [amount, setAmount] = useState();
    const [mnenmonic, setMnemonic] = useState('');
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [openInTransition, setOpenInTransition] = useState(false);
    const [info, setInfo] = useContext(InfoContext);
    const [status, setStatus] = useState();
    const [txFee, setTxFee] = useState();
    const [txDetails, setTxDetails] = useState()

    const handleClickOpenDeposit = () => {
        setOpenDeposit(!openDeposit);
        setAmount('')
        setMnemonic('')
    };
    
    const handleClickOpenWithdraw = () => {
        setOpenWithdraw(!openWithdraw);
        setAmount('')
        setMnemonic('')
    };

    const handleClickOpenTransition = () => {
        setOpenInTransition(!openInTransition)
    }

    const addDeposit = () => {
        if(info.wallet != null) {
            if(amount && mnenmonic) {
                try {
                    const anchorEarn = new AnchorEarn({
                        chain: CHAINS.TERRA,
                        network: NETWORKS.TEQUILA_0004,
                        address: info.wallet,
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

                            Axios.post(`https://anchorgold-server.herokuapp.com/api/transactions/${info.wallet}/transactions`, {
                                wallet: info.wallet,
                                transaction_type:"deposit",
                                amount: amount,
                                txHash: deposit.txDetails[0].txHash
                            })
                            
                            Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${info.wallet}`)
                            .then(resp => {
                                setInfo({ 
                                    initBalance: parseFloat(resp.data.ustBalance, 10) + parseFloat(amount, 10),
                                    balance: balanceInfo.balances[0].account_balance,
                                    deposit: balanceInfo.balances[0].deposit_balance,
                                    height: balanceInfo.height,
                                    liquidity: market.markets[0].liquidity,
                                    APY: market.markets[0].APY,
                                    reward: balanceInfo.balances[0].deposit_balance - (parseFloat(resp.data.ustBalance, 10) + parseFloat(amount, 10)),
                                    wallet: info.wallet
                                })
                            })
                            .catch(err => {
                                console.log( err, "ERROR GETTING BALANCE")
                            })

                            await Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${info.wallet}`, {
                                ustBalance :  parseFloat(info.initBalance, 10) + parseFloat(amount, 10)
                            }).then(resp => {
                                console.log('DEPOSITED SUCCESSFULLY')
                            }).catch(err => {
                                console.log( err, 'SUM FUCKED UP ERROR')
                            })
                        } catch (err) {
                            alert(err)
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
            handleClickOpenTransition()
        } else {
            alert('Connect Wallet')
            handleClickOpenDeposit()
        }
    }

    const addWithdraw = () => {
        if(info.wallet != null) {
            if(amount && mnenmonic) {
                try {
                    const anchorEarn = new AnchorEarn({
                        chain: CHAINS.TERRA,
                        network: NETWORKS.TEQUILA_0004,
                        address: info.wallet,
                        mnemonic: mnenmonic
                    });

                    async function withdrawData() {
                        try {
                            const withdraw = await anchorEarn.withdraw({
                                amount: amount, 
                                currency: DENOMS.UST
                            });

                            console.log("TXOUTPUT-withdraw", withdraw)

                            const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                            const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });
        
                            setStatus(withdraw.status)
                            setTxFee(withdraw.txFee)
                            setTxDetails(withdraw.txDetails[0].txHash)

                            Axios.post(`https://anchorgold-server.herokuapp.com/api/transactions/${info.wallet}/transactions`, {
                                wallet: info.wallet,
                                transaction_type:"withdraw",
                                amount: (Math.abs(amount) * -1),
                                txHash: withdraw.txDetails[0].txHash
                            })
                            
                            Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${info.wallet}`)
                            .then(resp => {
                                setInfo({ 
                                    initBalance: parseFloat(resp.data.ustBalance, 10) - parseFloat(amount, 10),
                                    balance: balanceInfo.balances[0].account_balance,
                                    deposit: balanceInfo.balances[0].deposit_balance,
                                    height: balanceInfo.height,
                                    liquidity: market.markets[0].liquidity,
                                    APY: market.markets[0].APY,
                                    reward: balanceInfo.balances[0].deposit_balance - (parseFloat(resp.data.ustBalance, 10) - parseFloat(amount, 10)),
                                    wallet: info.wallet
                                })
                            })
                            .catch(err => {
                                console.log( err, "ERROR GETTING BALANCE")
                            })

                            await Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${info.wallet}`, {
                                ustBalance :  parseFloat(info.initBalance, 10) - parseFloat(amount, 10)
                            }).then(resp => {
                                console.log('WITHDREW SUCCESSFULLY')
                            }).catch(err => {
                                console.log( err, 'SUM FUCKED UP ERROR')
                            })
                            
                        } catch (err) {
                            alert(err)
                        }
                    }
                    withdrawData(); 
                } catch(err) {
                    alert(err)
                }
            } else {
                alert('No data')
            }
            handleClickOpenWithdraw()
            handleClickOpenTransition()
        } else {
            alert('Connect Wallet')
            handleClickOpenWithdraw()
        }
    }

    const onClose =  () => {
        handleClickOpenTransition()
        setStatus('')
        setTxFee('')
        setTxDetails('')
    }

    return (
        <>
            <Title>TOTAL DEPOSIT</Title>
            <Typography variant="h4" color="textSecondary" component="p">
                {parseFloat(props.deposit).toFixed(2)} UST
            </Typography>
            <Box pt={4} align="center" >
                <Button onClick={handleClickOpenDeposit} variant="contained" className={classes.button} size="small" color="primary">
                    Deposit
                </Button>
                <Button onClick={handleClickOpenWithdraw} variant="contained" className={classes.button} size="small" color="primary">
                    Withdraw
                </Button>
            </Box>

            {/* IN TRANSITION */}
            <Dialog
                className={classes.dialog}
                open={openInTransition}
                TransitionComponent={Transition}
                keepMounted
                onClose={(event, reason) => {
                    console.log('Event', event, "Reason", reason)
                    if (reason !== 'backdropClick') {
                    onClose(event, reason);
                    }
                }}
                classes={{ paper : classes.dialogPaper}}
                maxWidth={'xl'}
            >
                <Box className={classes.box} m={5} >
                    <DialogTitle id="alert-dialog-slide-title"><Title>TRANSMITTING</Title></DialogTitle>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            <Typography>In Progress</Typography>
                        </Box>
                    </Box>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            status: {status}
                        </Box>
                    </Box>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            txFee: {txFee}
                        </Box>
                    </Box>
                    <Box display="flex"  >
                        <Box p={1} flexGrow={1}  >
                            txDetails: {txDetails}
                        </Box>
                    </Box>

                    <Box pt={4} align="center" >
                        {status && (
                            <Button onClick={onClose} variant="contained" className={classes.button} size="large" color="primary">
                                COMPLETED
                            </Button>
                        )}
                        
                    </Box>

                </Box>
            </Dialog>

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
                            /><FormHelperText id="my-helper-text">UST BALANCE: {info.balance} </FormHelperText>
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
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                label="Amount"  
                            /><FormHelperText id="my-helper-text">UST BALANCE: {parseFloat(info.deposit).toFixed(2)} </FormHelperText>
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
                        <Button onClick={addWithdraw} variant="contained" className={classes.button} size="large" color="primary">
                            Withdraw
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
