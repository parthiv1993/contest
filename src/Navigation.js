import React, { Component } from 'react';
import {Navbar,Nav,Form,FormControl,Button, Dropdown} from 'react-bootstrap';
import Axios from 'axios';
import Constants from './Constants';
import { getJwtToken, getHeaderObject, USER_KEY } from './util';
import { toast } from 'react-toastify';
import './navigation.css'

const ButtonWithWarning= (props)=> <Button variant="outline-info" onClick={()=>{
    //eslint-disable-next-line
    if(confirm(props.warning)){
        props.handler();
    }
}   
}>{props.buttonName}</Button>

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            isExtendedMenuOption :false
        }
    }

    logOut(){
        // const userName = localStorage.getItem([USER_KEY]) || 'User';
  
            localStorage.clear();
            window.location.reload();
    }

    componentWillUnmount() {
        localStorage.clear();
    }

    startAuctionHandler(){
        this.startAuctionRequest().then(
            (res)=>{
                toast.success('Auction started. Enjoy the auction!!');
            },
            (err)=>{

            }
        )
    }

    startAuctionRequest(){
        return Axios.get(Constants.BASE_URL +'/resetAuction',getHeaderObject());
    }

    timerHandler(){
        Axios.get(Constants.BASE_URL +'/toggleTimerEnabled',getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    pauseTimerNow(){
        Axios.get(Constants.BASE_URL +'/pauseTimer',getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    startTimerNow(){
        Axios.get(Constants.BASE_URL +'/startTimer',getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    changeTimerWaitForSold(){
        Axios.post(Constants.BASE_URL +'/changeTimerWaitForSold',{timeWait:this.inputText*1000},getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    changeTimerWaitForNextPlayer(){
        Axios.post(Constants.BASE_URL +'/changeTimerWaitForNextPlayer',{timeWait:this.inputText*1000},getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }

    getStatus(){
        Axios.get(Constants.BASE_URL +'/getStatus',getHeaderObject()).then(
            (res)=>{
                if(res.data){
                    try{
                        Object.keys(res.data).map(
                            key=>
                                {toast.info(
                                    [key]+' : ' +(JSON.stringify(res.data[key],null,4).replace(/\,/g,'___').replace(/\:/g,'=')
                                ),{
                                    autoClose:false,
                                    className:'statusNotification',
                                    position : toast.POSITION.TOP_CENTER
                                }
                                )
                            }
                        )
                    }
                    catch(e){

                    }
                }
                toast.info(res.data,{
                    autoClose: false
                  });
            },(err)=>{

            }
        )
    }

    tryTest(){
        const payload = {
            command : `cheatPlayerId = ${this.inputText}`
        };
        Axios.post(Constants.BASE_URL +'/eval',payload,getHeaderObject()).then(
            (res)=>{
                toast.success(res.data);
            },(err)=>{

            }
        )
    }


    render() {
        const userName = localStorage.getItem([USER_KEY]) || 'User';

        const originalNavBar = <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">{`Hi ${userName}`}</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Button variant="outline-info" onClick={this.logOut.bind(this)}>Log Out</Button>
            </Navbar>;

        const additionalOptions = <Navbar bg="dark" variant="dark">
                {
                    (userName=='Parthiv' || userName=='Nikhil') &&
                    <ButtonWithWarning
                            warning="You are about to restart the auction. Are you Sure?"
                            handler={this.startAuctionHandler.bind(this)}
                            buttonName = {'Start Auction'}
                    />
                }
                &nbsp;
                {
                    (userName=='Parthiv' || userName=='Nikhil') &&
                    <ButtonWithWarning
                            warning="You are about to toggle the timer. Are you Sure?"
                            handler={this.timerHandler.bind(this)}
                            buttonName = {'Enable / Disable Timer'}
                    />
                }
                &nbsp;
                {
                    (userName=='Parthiv') &&
                    <input onChange={(e)=>{this.inputText = parseInt(e.target.value)}}></input>
                }
                &nbsp;
                {
                     (userName=='Parthiv') &&
                     <ButtonWithWarning
                            warning="You are Change Timer for marking player sold. Are you Sure?"
                            handler={this.changeTimerWaitForSold.bind(this)}
                            buttonName = {'Change Time to Sold'}
                    />
                }
                &nbsp;
                {
                     (userName=='Parthiv') &&
                     <ButtonWithWarning
                            warning="You are Change Timer for getiing next player. Are you Sure?"
                            handler={this.changeTimerWaitForNextPlayer.bind(this)}
                            buttonName = {'Change Time to Next player'}
                    />
                }
                &nbsp;
                {
                     (userName=='Parthiv') &&
                     <ButtonWithWarning
                            warning="You are about to get status. Are you Sure?"
                            handler={this.getStatus.bind(this)}
                            buttonName = {'Get Status'}
                    />
                }
                &nbsp;
                {
                     (userName=='Parthiv') &&
                     <Button variant="outline-info" onClick={()=>{
                        //eslint-disable-next-line
                        if(confirm("You are about to get test. Are you Sure?")){
                            this.tryTest();
                        }
                    }   
                    }>{'Test'}</Button>
                    //  <ButtonWithWarning
                    //         warning="You are about to get test. Are you Sure?"
                    //         handler={this.tryTest.bind(this)}
                    //         buttonName = {'Test'}
                    // />
                }
            </Navbar>;
        return(
            [
                originalNavBar,
                additionalOptions,
            ]     
        )
    }
}

export default Navigation;
