import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
import { Table, Card } from 'react-bootstrap';


class PlayerRemaining extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            count:null
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
        const count = this.state.count;
        const user = localStorage.getItem('user');
        if(count){
            return(
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
            )
        }
        return null;
    }
}

export default PlayerRemaining;
