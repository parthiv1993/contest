import React, { useState } from 'react';
import {Navbar,Nav,Button} from 'react-bootstrap';
import Axios from 'axios';
import {   USER_KEY, getPrivilage } from '../../helpers/util';
import { toast } from 'react-toastify';
import './Navigation.css'
import constants from '../../helpers/Constants';

const ButtonWithWarning= (props)=> <Button 
        variant="outline-info" style={{marginLeft:'8px'}}
        onClick={()=>{window.confirm(props.warning) && props.handler()}}>
            {props.buttonName}
</Button>;
        

const Navigation =()=> {
    const userName = localStorage.getItem([USER_KEY]) || 'User';
    const isAdmin = getPrivilage() >= constants.priviledges.ADMIN;
    const [isOpened,setIsOpened] = useState(false);
    const [configValue,setConfigValue]=useState(null);

    const logOut=()=>{
        localStorage.clear();
        window.location.reload();
    }

    // const componentWillUnmount() {
    //     localStorage.clear();
    // }

    const startAuction = ()=>{
        Axios.get(constants.urls.startAuction).then(
            ()=>toast.success('Auction started. Enjoy the auction!!')
        )
    }

    const toggleTimer =()=>{
        Axios.get(constants.urls.toggleTimer).then(
            (res)=>toast.success(res.data)
        )
    }
    
    const changeTimerForSold = ()=>{
        const payload = {timeWait : configValue *1000}
        Axios.post(constants.urls.changeTimerForSold,payload).then(
            (res)=>toast.success(res.data)
        )
    }

    const changeTimerForNextPlayer= ()=>{
        const payload = {timeWait:configValue*1000}
        Axios.post(constants.urls.changeTImerForNextPlayer,payload).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    const testSpecialPlayer = ()=>{
        const payload = {command : `specialPlayerId = ${configValue}`}
        Axios.post(constants.urls.evaluation,payload).then(
            res=>toast.success(res.data)
        )
    }


    
    const additionalOptions = <div>
            <ButtonWithWarning
                warning="You are about to restart the auction. Are you Sure?"
                handler={startAuction}
                buttonName = {'Start Auction'}
            />
            <ButtonWithWarning
                warning="You are about to toggle the timer. Are you Sure?"
                handler={toggleTimer}
                buttonName = {'Enable / Disable Timer'}
            />
            <input onChange={(e)=>setConfigValue(parseInt(e.target.value))}></input>
            <ButtonWithWarning
                warning="You are Change Timer for marking player sold. Are you Sure?"
                handler={changeTimerForSold}
                buttonName = {'Change Time to Sold'}
            />
            <ButtonWithWarning
                warning="You are Change Timer for getiing next player. Are you Sure?"
                handler={changeTimerForNextPlayer}
                buttonName = {'Change Time to Next player'}
            />
            <ButtonWithWarning
                warning="You are about to get test. Are you Sure?"
                handler={testSpecialPlayer}
                buttonName = {'Test'}
            />
    </div>

    const originalNavBar = 
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                {`Hi ${userName}`}
            </Navbar.Brand>
            <Nav className="mr-auto">
                {isAdmin  && <Nav.Link onClick={()=>setIsOpened(!isOpened)}>More Options</Nav.Link>}
            </Nav>
                <Button variant="outline-info" onClick={logOut}>Log Out</Button>
        </Navbar>
        {isOpened && <Navbar  bg="dark" variant="dark">
                {additionalOptions}
        </Navbar>}
        </>
    

    
    return originalNavBar;
}

export default Navigation;
