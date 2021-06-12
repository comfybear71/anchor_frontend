import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core'
import {withStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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
    // boxTitle: {
    //     height: 120,
    //     backgroundColor: '#ffeb3b'
    // }
    
})
);

const CssTextField = withStyles({
    root: {
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: 'red',
        },
        '&:hover fieldset': {
        borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'green',
        },
    },
    },
})(TextField);

const  WalletMenuIcon = (props) => {

    const {handleMenu, anchorEl, open, handleClose} = props
    const classes = useStyles();

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountBalanceWalletTwoToneIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
            <div style={{ width: '200%' }}>
                <Box component="span" display="block">
                    <Box mx="auto" p={2}  >
                        <CssTextField  id="custom-css-standard-input" label="Enter Wallet Address" />
                        <Button 
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<AccountBalanceWalletTwoToneIcon />}
                        >
                            Connect
                        </Button>
                    </Box>
                </Box>
                <Box mx="auto" p={2}>
                    <MenuItem onClick={handleClose}>Connect Wallet Chrome Extension</MenuItem>
                </Box>
            </div>
        </Menu>
    </div>
    )
}

export default WalletMenuIcon
