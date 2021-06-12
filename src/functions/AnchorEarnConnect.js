import React, { useEffect, useContext, useState } from 'react'
import Axios from 'axios'
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
import { UserContext } from './context/UserContext';
import { InfoContext } from './context/InfoContext';
import { UserBalanceContext } from './context/UserBalanceContext'
import { RewardContext } from './context/RewardContext'

const AnchorEarnConnect = () => {
    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [rewards, setRewards] = useContext(RewardContext)

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
        <div>
            <h1>UST Balance: {info.balance}</h1><br />
            <h1>Initial Balance earning %: {parseFloat(userBalance).toFixed(2)} UST</h1> 
            <h1>Total = Initial Balance plus rewards: {parseFloat(info.deposit).toFixed(8)}</h1>
            <h1>Rewards Earned: {parseFloat(rewards).toFixed(8) }</h1>
            <h1>Height: {info.height}</h1>
            <br />
            <h1>Liquidity: {parseFloat(info.liquidity).toFixed(0)}</h1>
            <h1>APY: {parseFloat(info.APY).toFixed(2)}</h1>
        </div>
    )
}

export default AnchorEarnConnect;



  // let overallDeposits = "https://anchorgold-server.herokuapp.com/api/transactions_where/deposit"
    // let overallWithdraws = "https://anchorgold-server.herokuapp.com/api/transactions_where/withdraw"
    // let overallPurchases = "https://anchorgold-server.herokuapp.com/api/transactions_where/purchase"

    // const request1 = Axios.get(overallDeposits)
    // const request2 = Axios.get(overallWithdraws)
    // const request3 = Axios.get(overallPurchases)

    // Axios.all([request1, request2, request3]).then(Axios.spread((...responses)=> {
    //     const responseOne = responses[0]
    //     const responseTwo = responses[1]
    //     const responseThree = responses[2]

    //     setInterestEarningBalance(responseOne.data[0].sum, responseTwo.data[0].sum, responseThree.data[0].sum)

    // }))