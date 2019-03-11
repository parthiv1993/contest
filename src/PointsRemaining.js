import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
import { Table, Card } from 'react-bootstrap';


class PointsRemaining extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            points : null,
            count:null
        }
    }

    componentDidMount(){
        this.remainingPointsRequest();
        this.remainingPlayerRequest();
        this.interval = setInterval(()=>{
            this.remainingPointsRequest();
            this.remainingPlayerRequest();
        },Constants.POINTS_POLL_TIME)
    
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }
    
    remainingPointsRequest(){
        Axios.get(Constants.BASE_URL + '/remaningPoints',getHeaderObject()).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.points)){
                    this.setState({points:res.data})
                }
            },(err)=>{
                console.error(err);
            }
        )
    }

    remainingPlayerRequest(){
        Axios.get(Constants.BASE_URL + '/getRemainingPlayersCount',getHeaderObject()).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.points)){
                    this.setState({count:res.data})
                }
            },(err)=>{
                console.error(err);
            }
        )
    }


    render(){
        const points =this.state.points;
        const count = this.state.count;
        const user = localStorage.getItem('user');
        if(points && count){
            return(
                <div>
                <Card>
                    <Card.Header as="h5">
                        Points Remaining
                    </Card.Header>
                    <Card.Body>
                        <Table striped={true} bordered={true} hover={true} >
                                <thead>
                                    <tr>
                                        <th>
                                            Team Owner
                                        </th>
                                        <th>
                                            Points
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(points).map((key,index)=>
                                        <tr key={index }>
                                            <td >
                                                {key}
                                            </td>
                                            <td>
                                                {points[key]}
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header as="h5">
                        Players Remaining
                    </Card.Header>
                    <Card.Body>
                        <Table striped={true} bordered={true} hover={true} >
                                <thead>
                                    <tr>
                                        <th>
                                            Grade
                                        </th>
                                        <th>
                                            Number of Players
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(count).map((key,index)=>
                                        <tr key={index }>
                                            <td >
                                                {key}
                                            </td>
                                            <td>
                                                {count[key]}
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
                </div>
            )
        }
        return null;
    }
}

export default PointsRemaining;