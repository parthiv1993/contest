import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
import { Table ,Card} from 'react-bootstrap';


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

    render(){
        const team = this.state.team;
        if(team){
            return(
                <Card>
                    <Card.Header as="h5">My Team</Card.Header>
                    <Card.Body>
                    <Table triped='true' bordered='true' hover='true' size="sm">
                            <thead>
                                <tr>
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