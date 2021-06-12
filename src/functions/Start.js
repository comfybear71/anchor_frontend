import React, {useState, useContext, useEffect} from "react";
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'
import { Extension } from '@terra-money/terra.js';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Label, Input, FormText, Form, Text } from 'reactstrap';
import './Start.css'

const Start = () => {

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
        <>
            <div class="container-fluid ">
                <div class="container">
                    <div class="row mt-4 mb-4">
                        <div class="col-sm-10 mb-4 mt-4">
                        <div class="card" align="center">
                            <div class="card-body mt-2 mb-2">
                                    <h2 style={{display: 'inline-block'}}  class="title__heading">"Turn Terra into  </h2> 
                                    <h1 style={{display: 'inline-block'}} class="goldPrice">  GOLD..."</h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 mt-5 pt-2">
                            <div class="" align="center">
                                <div >
                                    <button 
                                        type="button" 
                                        class="btn btn-success align-middle"
                                        onClick={wallet ? undefined : connect}>
                                        {!wallet && "Connect Wallet"}
                                        <text 
                                            multiline={wallet?.address}
                                            numberOfLines={wallet?.address ? 5 : 2}
                                            ellipsizeMode={'middle'}
                                        >
                                            {wallet?.address}
                                        </text>
                                        {setValue(wallet?.address)} 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 mb-4">
                    <div class="col-sm-4 mb-4 mt-4">
                        <div class="card" align="center">
                            <div class="card-body">
                            <h5 class="goldPrice">Gold Price</h5>
                            <p class="card-text"><div class="goldPrice" id="currentGoldPrice"></div></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mb-4 mt-4">
                        <div class="card" align="center">
                            <div class="card-body">
                            <h5 class="silverPrice">Silver Price</h5>
                            <p class="card-text"><div class="silverPrice" id="currentSilverPrice"></div></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 mb-4 mt-4">
                        <div class="card" align="center">
                            <div class="card-body">
                            <h5 class="silverPrice">Platinum Price</h5>
                            <p class="card-text"><div class="silverPrice" id="currentPlatinumPrice"></div></p>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="row mt-4 mb-4 justify-content-lg-center justify-content-md-center justify-content-sm-center" >
                    <div class="col-sm-12 col-lg-12 col-md-12">
                        <div class="card " >
                            <div class="card-body">
                            <h5 class="card-title">Anchor.Gold</h5>
                            <ul class="list-group">
                                <li class="list-group-item">Earn 20% APY from Anchor Earn Protocol</li>
                                <li class="list-group-item">Convert Interest into Gold, Silver, Platinum & Coins</li>
                                <li class="list-group-item">Delivery World Wide or can secure Vault</li>
                                <li class="list-group-item">Donations/Funds/Support: <h3>terra1pvl57vdmke62555407pcsc8u0huf20xhjt3x0l</h3></li>
                                <li class="list-group-item">looking for Dev's/Community to get onBoard email <a href="mailto:stuart@psal.net.au">Stuie</a></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="row mt-4 mb-4 justify-content-lg-center justify-content-md-center justify-content-sm-center" >
                    <div class="col-sm-12 col-lg-12">
                        <div class="card mt-2 mb-2">
                            <div class="card-body">
                                <h1 class="goldPrice" align="center">COMING SOON</h1><br />
                                <h3 class="card-title" align="center">Not affiliated with TerraFirmLabs</h3>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Start; 
