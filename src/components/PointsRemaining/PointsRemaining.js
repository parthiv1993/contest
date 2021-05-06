import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import Constants from '../../helpers/Constants';
import { Table, Card ,Button} from 'react-bootstrap';
import { toast } from 'react-toastify';


class PointsRemaining extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            points : null
        }
    }

    componentDidMount(){
        this.remainingPointsRequest();
        this.interval = setInterval(()=>{
            this.remainingPointsRequest();
        },Constants.POINTS_POLL_TIME)
    
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }
    
    remainingPointsRequest(){
        Axios.get(Constants.urls.getPointsRemaining).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.points)){
                    this.setState({points:res.data})
                }
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
            }
        )
    }


    onRefreshHandler(){
        this.remainingPointsRequest();
    }

    getTableHeader(){
        return <tr>
                    <th>Team Owner</th>
                    <th>Points</th>
                </tr>
    }

    getTableRow(user,value){
        return <tr key={user}>
                    <td >{user}</td>
                    <td>{value}</td>
                </tr>
    }

    render(){
        const points =this.state.points;
        if(points ){
            return(
                <Card>
                    <Card.Header as="h5">
                        Points Remaining
                        <Button 
                            variant="dark" 
                            size='sm' 
                            style={{float:'right'}} 
                            onClick={this.onRefreshHandler.bind(this)}>
                                Refresh
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Table striped={true} bordered={true} hover={true} >
                                <thead>
                                    {this.getTableHeader()}
                                </thead>
                                <tbody>
                                    {(Object.keys(points)).sort().map((user)=>this.getTableRow(user,points[user]))}
                                </tbody>
                            </Table>
                    </Card.Body>
                </Card>
            )
        }
        return null;
    }
}

export default PointsRemaining;
