import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';


const MenuIcon = (props) => {
    

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
            >
                <MenuTwoToneIcon />
            </IconButton>
            {/* <Menu
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
            </Menu> */}
        </div>
    )
}

export default MenuIcon
