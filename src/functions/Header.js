import React, {useState, useContext, useEffect} from "react";
// import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
// import Axios from 'axios'
// import { Extension } from '@terra-money/terra.js';
// import { UserContext } from './context/UserContext'

const Header = () => {

    // const [value, setValue] = useContext(UserContext);
    // const [wallet, setWallet] = useState();
    // const [ustBalance, setUSTBalance] = useState();

    // const ext = new Extension();

    // const connect = () => {
    //     ext.connect();
    //     ext.on("onConnect", setWallet);
    // }

    // useEffect(() => {
    //     if(value != null){
    //         const anchorEarn = new AnchorEarn({
    //             name: "testnet",
    //             chain: CHAINS.TERRA,
    //             network: NETWORKS.TEQUILA_0004,
    //             address: value
    //         });

    //         async function fetchData() {
    //             const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });

    //             setUSTBalance(balanceInfo.balances[0].account_balance)

    //             let addNewWallet = `https://anchorgold-server.herokuapp.com/api/users`
    //             Axios.post(addNewWallet, {
    //                 wallet: value,
    //                 ustBalance: balanceInfo.balances[0].account_balance
    //             })

    //             let updateUSTBalance = `https://anchorgold-server.herokuapp.com/api/users/${value}`
    //             console.log("UST BAL: ", ustBalance)
    //             Axios.patch(updateUSTBalance, {
    //                 ustBalance: ustBalance
                    
    //             })
    //         }

    //         fetchData(); 
    //     }
    // }, [])



    return (
        
        <nav class="navbar navbar-expand-lg navbar-dark ">
            <a class="navbar-brand" href="index.html">
                <h2 class="heading">Anchor.Gold</h2>
            </a>

            <button 
                class="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon "></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ">
                    <li class="nav-item ">
                        <a class="nav-link" href="earn.html"><h2>Earn</h2></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="insta.html"><h2>InstaBuy</h2></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header; 
