import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Body from './Body';
import MenuAppBar from './MenuAppBar';
import Earn from './Earn'


import { InfoContext } from './context/InfoContext';
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        backgroundColor: theme.palette.background.paper,
    })
);

function App() {

    // const [value, setValue] = useState(null);
    const [info, setInfo] = useState([null]);
    // const [userBalance, setUserBalance] = useState(null);
    // const [rewards, setRewards] = useState(null);
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                {/* <UserContext.Provider value={[value, setValue]} > */}
                    <InfoContext.Provider value={[info, setInfo]} >
                        <Route path="/earn">
                            <MenuAppBar />
                            <Earn />
                        </Route>
                        <Route exact path="/">
                            <MenuAppBar />
                            <Body />
                        </Route>
                    </InfoContext.Provider >
                {/* </UserContext.Provider> */}
            </div>
        </Router>
    );
}

export default App;
