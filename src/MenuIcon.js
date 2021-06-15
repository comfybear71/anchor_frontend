import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';


const MenuIcon = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (nav) => {
        setAnchorEl(null);
    
    };

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <MenuTwoToneIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component="a" href="/earn">Earn</MenuItem>
                <MenuItem component="a" href="/">Home</MenuItem>
            </Menu>
        </>
    )
}

export default MenuIcon
