    import React, { useState } from 'react';

    import {
        ThemeProvider,
        withStyles,
        makeStyles,
        createMuiTheme,
        
    } from '@material-ui/core/styles';
    import AppBar from '@material-ui/core/AppBar';
    import Toolbar from '@material-ui/core/Toolbar';
    import Typography from '@material-ui/core/Typography';
    import Switch from '@material-ui/core/Switch';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import FormGroup from '@material-ui/core/FormGroup';
    import { green, blue } from "@material-ui/core/colors";
    import Radio from '@material-ui/core/Radio';
    
    import WalletMenuIcon from './WalletMenuIcon'
    import MenuIcon from './MenuIcon'
    import gold from './images/gold.png'


    const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexShrink: 1,
                textAlign: 'left'
            },
            titleMain1: {
                flexGrow: 1,
                margin: theme.spacing(1.5),
                textAlign: 'center'
            },
            margin: {
                margin: theme.spacing(0.5),
            },
            fixedHeight: {
                height: 120
            },
            logo: {
                maxWidth: 120,
            },
            appBarSpacer: theme.mixins.toolbar,
        })
    );

    const GreenRadio = withStyles({
            root: {
                color: green[400],
                '&$checked': {
                    color: green[600],
                },
            },
            checked: {},
    })((props) => <Radio color="default" {...props} />);
    
    const BlueRadio = withStyles({
            root: {
            color: blue[400],
            '&$checked': {
                color: blue[600],
            },
            },
            checked: {},
    })((props) => <Radio color="default" {...props} />);

    export default function MenuAppBar() {
    
        const [darkState, setDarkState] = useState(false);
        const palletType = darkState ? "dark" : "light";
        const mainPrimaryColor = darkState ? '#ffeb3b' : '#263238';
        const mainSecondaryColor = darkState ? '#263238' : '#ffeb3b';
        
        const darkTheme = createMuiTheme({
            palette: {
            type: palletType,
                primary: {
                    main: mainPrimaryColor
                },
                secondary: {
                    main: mainSecondaryColor
                }
            }
        });
        const [selectedValue, setSelectedValue] = React.useState('tequila');
        const classes = useStyles();
        const [auth, setAuth] = React.useState(true);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleThemeChange = () => {
            setDarkState(!darkState);
        };

        const handleChangeChecked = (event) => {
            setSelectedValue(event.target.value);
        };

        const handleChange = (event) => {
            setAuth(event.target.checked);
        };

        const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };



    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <FormGroup row >
                    <FormControlLabel
                        
                        control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                        label={auth ? 'Disconnect' : 'Connect Wallet'}
                        
                    />
                    {auth && (
                        <div> 
                            <FormControlLabel
                                control={<BlueRadio
                                    checked={selectedValue === 'tequila'}
                                    onChange={handleChangeChecked}
                                    value="tequila"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'tequila' }}
                                    size="small"
                                />}
                                label="tequila"
                            />
                            <FormControlLabel
                                control={<GreenRadio
                                    checked={selectedValue === 'columbus'}
                                    onChange={handleChangeChecked}
                                    value="columbus"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'columbus' }}
                                    size="small"
                                />}
                                label="columbus"
                            />
                        </div>
                    )}
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                        {/* <Typography variant="h6" className={classes.title}>Anchor.Gold</Typography> */}
                        <Typography variant="h6" className={classes.titleMain1}>Turn Terra into <img src={gold} alt="Anchor.Gold!" className={classes.logo} /></Typography>
                        
                        <Switch checked={darkState} onChange={handleThemeChange} />
                        {auth && (
                            <WalletMenuIcon handleMenu={handleMenu} anchorEl={anchorEl} open={open} handleClose={handleClose}/>
                        )}
                            <MenuIcon />
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}
