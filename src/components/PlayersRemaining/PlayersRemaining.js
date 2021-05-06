import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import Constants from '../../helpers/Constants';
import { Table, Card, Button } from 'react-bootstrap';


class PlayerRemaining extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:null
        }
    }

    componentDidMount(){
        this.remainingPlayerRequest();
        this.interval = setInterval(()=>{
            this.remainingPlayerRequest();
        },Constants.POINTS_POLL_TIME)
    
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    remainingPlayerRequest(){
        Axios.get(Constants.urls.getRemainingPlayers).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.data)){
                    this.setState({data:res.data})
                }
            })
    }

    onRefreshHandler(){
        this.remainingPlayerRequest();
    }


    getTableHeaderRow(){
        return  <tr>
                    <th>Type</th>
                    <th>Number of Players</th>
                </tr>
    }

    getTableRow(type,count){
        return  <tr key={type }>
                    <td >{type.replace('_',' ')}</td>
                    <td>{count}</td>
                </tr>
    }

    render(){
        const data = this.state.data;
        if(data){
            return(
                <Card>
                    <Card.Header as="h5">
                        Players Remaining
                        <Button variant="dark" size='sm' style={{float:'right'}} onClick={this.onRefreshHandler.bind(this)}>Refresh</Button>
                    </Card.Header>
                    <Card.Body>
                        <Table striped={true} bordered={true} hover={true} >
                                <thead>
                                    {this.getTableHeaderRow()}
                                </thead>
                                <tbody>
                                    {Object.keys(data).map((type)=>this.getTableRow(type,data[type]))}
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
            )
        }
        return null;
    }
}

export default PlayerRemaining;
