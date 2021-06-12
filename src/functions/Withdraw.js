import React, {useState, useContext} from 'react'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Label, Input, FormText, Form } from 'reactstrap';
import Axios from 'axios';

const Withdraw = () => {

    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [amount, setAmount] = useState();   
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const addWithdraw = () => {

        if(value != null){
            const anchorEarn = new AnchorEarn({
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value,
                mnemonic: 'memory slim artefact off slow distance warm soap measure fold stage term fun action elbow detect frozen today crunch neck bag insane senior bring'
            });

            async function withdrawData() {
                try { 
                    const withdraw = await anchorEarn.withdraw({
                        amount: amount, 
                        currency: DENOMS.UST
                    });

                    console.log("TXOUTPUT-WITHDRAW", withdraw)

                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                    setInfo({
                        w_status: withdraw.status,
                        w_txFee: withdraw.txFee,
                        w_txDetails: withdraw.txDetails[0].txHash,
                        balance: balanceInfo.balances[0].account_balance,
                        deposit: balanceInfo.balances[0].deposit_balance,
                        height: balanceInfo.height,
                        liquidity: market.markets[0].liquidity,
                        APY: market.markets[0].APY
                    })
                    
                    Axios.post(`https://anchorgold-server.herokuapp.com/api/transactions/${value}/transactions`, {
                        wallet: value,
                        transaction_type:"withdraw", 
                        amount: Math.abs(amount) * -1,
                        txHash: withdraw.txDetails[0].txHash
                    })
                    
                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        
                        Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${value}`, {
                            "ustBalance":parseFloat((Math.abs(amount) * -1), 10) + parseFloat(resp.data.ustBalance, 10)
                        })
                        
                    })
                    .catch(err => {
                        console.log( err, "ERROR GETTING BALANCE")
                    })

                } catch (e) {
                    console.log(e)
                } finally {
                    const user_balance = Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        console.log(user_balance)
                        setUserBalance(resp.data.ustBalance)
                    })
                }
            }
            withdrawData(); 
        }
    }

    const toggle = () => setOpen(!open);

    return (
        // <div>
        
        //     <input 
        //         type="number"
        //         value={amount}
        //         onChange={e => setAmount(e.target.value)}  
        //         placeholder='Enter an Amount' />
            
        //     <button onClick={addWithdraw} >
        //         Withdraw
        //     </button>
        //     <br />
        //     <div>{" Status: " + info.w_status} {"...."} {" Fee: " + info.w_txFee}{"...."} {" Details: " + info.w_txDetails}</div>
            
        // </div>
        <>
        <Button color="primary" onClick={toggle}>Withdraw</Button>
            <Modal returnFocusAfterClose={focusAfterClose} isOpen={open} toggle={toggle} >
                <ModalHeader toggle={toggle}>WITHDRAW</ModalHeader>
                <ModalBody>
                    
                    <Container>
                    
                        <Row>
                            <Input
                                type="number"
                                name="withdraw"
                                id="withdrawForm"
                                placeholder="Enter an Amount"
                            />
                        </Row>
                        <Row>
                            <Col align="right">
                                <FormText color="muted">
                                    {parseFloat(info.deposit).toFixed(8)}UST
                                </FormText>
                            </Col>
                        </Row>
                        <Row>
                            <Button color="primary" onClick={toggle}>Proceed</Button>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </>
    )
}
export default Withdraw;
