import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
import { Table ,Card,Button} from 'react-bootstrap';


class YourTeam extends React.Component{
    constructor(props){
        super(props);

        this.state={
            team : null
        }
    }

    componentDidMount(){
        this.getYourTeam();
        this.interval = setInterval(()=>{
            this.getYourTeam();
        },Constants.MYTEAM_POLL_TIME)
    }


    componentWillUnmount(){
        window.clearInterval(this.interval);
    }
    
    getYourTeam(){
        Axios.get(Constants.BASE_URL + '/myTeam',getHeaderObject()).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.team)){
                    this.setState({team:res.data})
                }
            },(err)=>{
                console.error(err);
            }
        )
    }

    onRefreshHandler(){
        this.getYourTeam();
    }

    render(){
        const team = this.state.team;
        if(team){
            return(
                <Card>
                    <Card.Header as="h5">
                        My Team
                        <Button variant="dark" size='sm' style={{float:'right'}} onClick={this.onRefreshHandler.bind(this)}>Refresh</Button>
                    </Card.Header>
                    <Card.Body>
                        <div className='legend'>
                            <ul style={ {listStyle: 'none' }}>
                                <li style={{ float: 'left',marginRight: '10px' }}>
                                    <span style={{ border: '1px solid #ccc',float: 'left', width: '12px', height: '12px', margin: '2px',backgroundColor:'#a0a1e4' }}>
                                     </span>
                                     Indian
                                </li>
                                <li style={{ float: 'right',marginRight: '10px' }}>
                                    <span style={{ border: '1px solid #ccc',float: 'left', width: '12px', height: '12px', margin: '2px',backgroundColor:'#d8bd56' }}>
                                     </span>
                                     Overseas
                                </li>
                            </ul>
                        </div>
                    <Table bordered='true' hover='true' size="sm">
                            <thead>
                                <tr>
                                    <th>
                                        Sr.
                                    </th>
                                    <th>
                                        Player Name
                                    </th>
                                    <th>
                                        Points
                                    </th>
                                    <th>
                                        Team
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.map(
                                        (player,index)=>
                                            <tr key={index}>
                                                <td>
                                                    {index+1}
                                                </td>
                                                <td>
                                                    {player.name}
                                                </td>
                                                <td>
                                                    {player.soldAt}
                                                </td>
                                                <td>
                                                    {player.team}
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                
            )
        }
        return null;
    }
}

export default YourTeam;