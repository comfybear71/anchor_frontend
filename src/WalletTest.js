import React, { useContext, useEffect} from 'react';

import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import { RewardContext } from './context/RewardContext'
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import Axios from 'axios'


const  WalletTest = (props) => {

    const [value, setValue] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [rewards, setRewards] = useContext(RewardContext)
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    

    useEffect(() => {
        if(value != null){

            const anchorEarn = new AnchorEarn({
                name: "testnet",
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value
            });

            async function fetchData() {
                const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        setUserBalance(resp.data.ustBalance)
                        setRewards(balanceInfo.balances[0].deposit_balance - resp.data.ustBalance)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
                setInfo({
                    balance: balanceInfo.balances[0].account_balance,
                    deposit: balanceInfo.balances[0].deposit_balance,
                    height: balanceInfo.height,
                    liquidity: market.markets[0].liquidity,
                    APY: market.markets[0].APY
                })
            }
            fetchData(); 
        }
    })

    return (
        <>
    </>
    )
}

export default WalletTest
