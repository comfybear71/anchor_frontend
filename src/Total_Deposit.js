import React, {useState} from "react";
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
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);

    const handleClickOpenDeposit = () => {
        setOpenDeposit(!openDeposit);
    };
    
    const handleClickOpenWithdraw = () => {
        setOpenWithdraw(!openWithdraw);
    };

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
                                // floatingLabelText="Amount"
                                label="Amount"  
                            /><FormHelperText id="my-helper-text">UST BALANCE: </FormHelperText>
                        </Box>
                    </Box>
                    
                    <Box pt={4} align="center" >
                        <Button onClick={handleClickOpenDeposit} variant="contained" className={classes.button} size="large" color="primary">
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
