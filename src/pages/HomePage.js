import React, { Component } from 'react';
import Navigation from '../components/NavigationsBar';
import LiveAuction from '../components/LiveAuction';
import { Row,Col } from 'react-bootstrap';
import PointsRemaining from '../components/PointsRemaining';
import YourTeam from '../components/YourTeam/YourTeam';
import AllPlayerDetails from '../components/AllPlayerDetails';
import PlayersRemaining from '../components/PlayersRemaining';



class HomePage extends Component {
  render() {
    return (
      <div>
          <Navigation/>
          <br/>
          <br/>
          <Row style={{margin:'0px'}}>
            <Col sm={12} lg={3} >
              <LiveAuction/>
              </Col>
            <Col sm={12} lg={3} >
              <PlayersRemaining/>
              </Col>
            <Col  sm={12} lg={3}>
              <PointsRemaining/>
            </Col>
            <Col sm={12} lg={3}>
              <YourTeam/>
            </Col>
            <Col sm={12}>
              <br/>
            </Col>
            <Col sm={12}>
              <AllPlayerDetails/>
            </Col>
          </Row>
      </div>
    );
  }
}

export default HomePage;
