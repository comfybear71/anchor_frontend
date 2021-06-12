import React, {useState, useContext} from 'react'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import Axios from 'axios';

const Purchase = () => {

    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [amount, setAmount] = useState();   

    const addPurchase = () => {

        if(value != null){
            const anchorEarn = new AnchorEarn({
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value,
                mnemonic: 'memory slim artefact off slow distance warm soap measure fold stage term fun action elbow detect frozen today crunch neck bag insane senior bring'
            });

            async function purchaseData() {
                try { 
                    const send = await anchorEarn.send({
                        currency: DENOMS.AUST,
                        recipient: 'terra1g96ued648jw7d937e2gqgnqy5g0p63cdj9z6cq',
                        amount: amount,
                    });

                    console.log("TXOUTPUT-PURCHASE", send)

                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                    setInfo({
                        p_status: send.status,
                        p_txFee: send.txFee,
                        p_txDetails: send.txDetails[0].txHash,
                        balance: balanceInfo.balances[0].account_balance,
                        deposit: balanceInfo.balances[0].deposit_balance,
                        height: balanceInfo.height,
                        liquidity: market.markets[0].liquidity,
                        APY: market.markets[0].APY
                    })
                    
                } catch (e) {
                    console.log(e)
                } 
            }
            purchaseData(); 
        }
    }

    return (
        <div>
        
            <input 
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}  
                placeholder='Enter an Amount' />
            
            <button onClick={addPurchase} >
                Purchase
            </button>
            <br />
            <div>{" Status: " + info.p_status} {"...."} {" Fee: " + info.p_txFee}{"...."} {" Details: " + info.p_txDetails}</div>
            
        </div>
    )
}
export default Purchase;
