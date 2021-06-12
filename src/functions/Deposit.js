import React, {useState, useContext} from 'react'
import {AnchorEarn, CHAINS, NETWORKS, DENOMS} from '@anchor-protocol/anchor-earn';
import { UserContext } from './context/UserContext'
import { InfoContext } from './context/InfoContext'
import { UserBalanceContext } from './context/UserBalanceContext'
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Label, Input, FormText, Form } from 'reactstrap';
import AlertExample from './Alert'
import './Deposit.css'

const Deposit = () => {

    const [value] = useContext(UserContext);
    const [info, setInfo] = useContext(InfoContext);
    const [userBalance, setUserBalance] = useContext(UserBalanceContext);
    const [amount, setAmount] = useState();  
    const [visible, setVisible] = useState(false); 
    const [status, setStatus] = useState();
    const [txFee, setTxFee] = useState();
    const [txDetails, setTxDetails] = useState()
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const addDeposit = () => {

        if(value != null){
            const anchorEarn = new AnchorEarn({
                chain: CHAINS.TERRA,
                network: NETWORKS.TEQUILA_0004,
                address: value,
                mnemonic: 'memory slim artefact off slow distance warm soap measure fold stage term fun action elbow detect frozen today crunch neck bag insane senior bring'
            });


            async function depositData() {
                try { 
                    const deposit = await anchorEarn.deposit({
                        amount: amount, 
                        currency: DENOMS.UST
                    });

                    console.log("TXOUTPUT-DEPOSIT", deposit)

                    const balanceInfo = await anchorEarn.balance({ currencies: [ DENOMS.UST ] });
                    const market = await anchorEarn.market({ currencies: [ DENOMS.UST ] });

                    setStatus(deposit.status)
                    setTxFee(deposit.txFee)
                    setTxDetails(deposit.txDetails[0].txHash)
                    setInfo({
                        balance: balanceInfo.balances[0].account_balance,
                        deposit: balanceInfo.balances[0].deposit_balance,
                        height: balanceInfo.height,
                        liquidity: market.markets[0].liquidity,
                        APY: market.markets[0].APY
                    })
                    
                    Axios.post(`https://anchorgold-server.herokuapp.com/api/transactions/${value}/transactions`, {
                        wallet: value,
                        transaction_type:"deposit",
                        amount: amount,
                        txHash: deposit.txDetails[0].txHash
                    })
                    
                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        
                        Axios.patch(`https://anchorgold-server.herokuapp.com/api/users/${value}`, {
                            "ustBalance":parseFloat(amount, 10) + parseFloat(resp.data.ustBalance, 10)
                        })
                        
                    })
                    .catch(err => {
                        console.log( err, "ERROR GETTING BALANCE")
                    })

                } catch (e) {
                    console.log(e)
                } 
                finally {
                    Axios.get(`https://anchorgold-server.herokuapp.com/api/users/${value}`)
                    .then(resp => {
                        console.log(resp.data.ustBalance)
                        setUserBalance(resp.data.ustBalance)
                        setVisible(true)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
                }
            }
            depositData(); 
            
        }
        
    }

 
    // const onDismiss = () => {
    //     setVisible(false);
    // }

    const toggle = () => setOpen(!open);

    // const handleSelectChange = ({target: { value }}) => {
    //     setFocusAfterClose(JSON.parse(value));
    // }

    return (
        <>
        
            {/* <input 
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}  
                placeholder='Enter an Amount' /> */}
            
            {/* <Button class="deposit__button" color="secondary" onClick={handleSelectChange} >
                Deposit
            </Button>
            
            <br />
                <Alert color="success" isOpen={visible} toggle={onDismiss} fade={true}>
                    <h4 className="alert-heading">{status}</h4>
                    <p>
                        {"Fee: " + txFee} <br />
                        {"\n txHash: " + txDetails}
                    </p>
                </Alert> */}
                
                {/* <div> */}
            
            <Button color="primary" onClick={toggle}>Deposit</Button>
            <Modal returnFocusAfterClose={focusAfterClose} isOpen={open} toggle={toggle} >
                <ModalHeader toggle={toggle}>DEPOSIT</ModalHeader>
                <ModalBody>
                    
                    <Container>
                    
                        <Row>
                            <Input
                                type="number"
                                name="deposit"
                                id="depositForm"
                                placeholder="Enter an Amount"
                            />
                        </Row>
                        <Row>
                            <Col align="right">
                                <FormText color="muted">
                                    {info.balance}UST
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
export default Deposit;


