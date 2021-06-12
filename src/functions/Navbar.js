import React, {useState, useContext, useEffect} from "react";
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'
import { Extension } from '@terra-money/terra.js';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Label, Input, FormText, Form, Text } from 'reactstrap';

const Navbar = () => {

    const [value, setValue] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [wallet, setWallet] = useState();

    const ext = new Extension();

    const connect = () => {
        ext.connect();
        ext.on("onConnect", setWallet);
    }

    useEffect(() => {
        if(value != null){
            const anchorEarn = new AnchorEarn({
                name: "testnet",
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value
            });

            async function fetchData() {
                
                try {
                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    setInfo({initBalance: balanceInfo.balances[0].account_balance})
                } catch (e) {
                    console.log(e, "WALLET is EMPTY!!")
                }
                
                Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                .then(resp => {
                    if(resp.data.ustBalance == null){
                        Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${value}`, {
                            ustBalance: 0
                        })
                    } else {
                        setUserBalance(resp.data.ustBalance)
                    }
                })
                .catch(err => {
                    console.log( err, "WALLET HASNT BEEN ADDED YET")
                    addANewWallet()
                })
            }
            fetchData(); 
        }
    }, [value]);

    const addANewWallet = () => {
        Axios.post(`https://anchorgold-server.herokuapp.com/api/users`, {
            wallet: value,
            ustBalance: 0
        }).then(resp => {
            //NO CODE
        })
        .catch(err => {
            console.log( err, "ERROR ADDING WALLET")
        })
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark ">
            <a class="navbar-brand" href="index.html"><h2 class="heading">Anchor.Gold</h2></a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <a class="nav-link" href="earn.html"><h2>Earn</h2></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="insta.html"><h2>InstaBuy</h2></a>
                    </li>
                    <li class="nav-item mt-3">
                        <Button outline color="success"
                            onClick={wallet ? undefined : connect}
                        >
                            {!wallet && "Connect Wallet"}
                            {wallet?.address}
                            {setValue(wallet?.address)} 
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
