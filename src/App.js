import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Body from './Body';
import MenuAppBar from './MenuAppBar';


import { UserContext } from './context/UserContext';
import { InfoContext } from './context/InfoContext';
import { UserBalanceContext } from './context/UserBalanceContext';
import { RewardContext } from './context/RewardContext';
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        backgroundColor: theme.palette.background.paper,
    })
);

function App() {

    const [value, setValue] = useState(null);
    const [info, setInfo] = useState([null]);
    const [userBalance, setUserBalance] = useState(null);
    const [rewards, setRewards] = useState(null);
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <UserContext.Provider value={[value, setValue]} >
                    <UserBalanceContext.Provider value={[userBalance, setUserBalance]}>
                        <InfoContext.Provider value={[info, setInfo]} >
                            <RewardContext.Provider value={[rewards, setRewards]}>
                                <Route path="/">
                                    <MenuAppBar />
                                    <Body />
                                </Route>
                            </RewardContext.Provider>
                        </InfoContext.Provider >
                    </UserBalanceContext.Provider>
                </UserContext.Provider>
            </div>
        </Router>
    );
}

export default App;
