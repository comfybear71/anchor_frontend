import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {useStyles} from './styles.js'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const MenuIcon = (props) => {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const classes = useStyles(props);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    
    // const handleClose = (nav) => {
    //     setAnchorEl(null);
    // };

    const handleClickOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickOpenMenu}
                color="inherit"
            >
                <MenuTwoToneIcon />
            </IconButton>
            {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component="a" href="/earn">Earn</MenuItem>
                <MenuItem component="a" href="/">Home</MenuItem>
            </Menu> */}
             <Dialog
                    className={classes.dialogup}
                    open={openMenu}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClickOpenMenu}
                    classes={{ paper : classes.dialogPaper}}
                    maxWidth={'xl'}
                >
                    <Box className={classes.box} m={5} >
                        <Box pt={1} align="center" >
                            <Button  variant="contained" className={classes.button} size="large" color="primary" component="a" href="/earn">
                                EARN
                            </Button>
                        </Box>
                        <Box pt={1} align="center" >
                            <Button  variant="contained" className={classes.button} size="large" color="primary" component="a" href="/">
                                HOMIE
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
        </>
    )
}

export default MenuIcon
