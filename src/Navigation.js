import React, { Component } from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import Axios from 'axios';
import Constants from './Constants';
import { getJwtToken, getHeaderObject } from './util';


class Navigation extends Component {
    logOut(){
        localStorage.clear();
        window.location.reload();
    }

    startAuctionHandler(){
        this.startAuctionRequest().then(
            (res)=>{

            },
            (err)=>[

            ]
        )
    }

    startAuctionRequest(){
        return Axios.get(Constants.BASE_URL +'/resetAuction',getHeaderObject());
    }

    render() {
        const userName = localStorage.getItem('user') || 'User';
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">{`Hi ${userName}`}</Navbar.Brand>
                <Nav className="mr-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                {
                    userName=='Parthiv' &&
                    <Button variant="outline-info" onClick={this.startAuctionHandler.bind(this)}>Start Auction</Button>
                }
                &nbsp;
                <Button variant="outline-info" onClick={this.logOut.bind(this)}>Log Out</Button>
            </Navbar>
                    
        )
    }
}

export default Navigation;
