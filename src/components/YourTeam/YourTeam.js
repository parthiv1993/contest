import React from 'react';
import _ from 'lodash';
import Axios from'axios';
// import { getHeaderObject } from '../../helpers/util';
import Constants from '../../helpers/Constants';
import { Table ,Card,Button} from 'react-bootstrap';
import { toast } from 'react-toastify';


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
        Axios.get(Constants.urls.getMyTeam).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.team)){
                    this.setState({team:res.data})
                }
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
            }
        )
    }

    onRefreshHandler(){
        this.getYourTeam();
    }


    getTeamColour(team){
        const obj ={
            CSK : '#fcce06',
            MI : '#004f91',
            KKR : '#3a225d',
            SRH : '#f7a721',
            RCB : '#d5152c',
            KXIP : '#ed1f27',
            DC: '#2561ae',
            RR :'#254aa5',
        }
        return obj[team];
    }

    getTeamTextColor(team){
        const obj = {
            CSK : '#f25c19',
            MI : '#ffffff',
            KKR : '#f3c433',
            SRH : '#9a1c22',
            RCB : '#000000',
            KXIP : '#ffffff',
            DC: '#d71921',
            RR :'#ffffff'
        }
        return obj[team];
    }


    getTableHeaderRow(){
        return <tr>
                <th>Sr.</th>
                <th>Player Name</th>
                <th>Points</th>
                <th>Team</th>
            </tr>
    }

    getTableRow(player,index){
        return <tr key={player.name}>
                    <td>{index+1}</td>
                    <td>{player.name}</td>
                    <td>{player.soldAt}</td>
                    <td style={{backgroundColor:`${this.getTeamColour(player.team)}`,color:`${this.getTeamTextColor(player.team)}`}}>
                        {player.team}
                    </td>
                </tr>
    }

    render(){
        const team = this.state.team;
        if(team){
            return(
                <Card>
                    <Card.Header as="h5">
                        My Team
                        <Button variant="dark" size='sm' style={{float:'right'}} onClick={this.onRefreshHandler.bind(this)}>
                            Refresh
                        </Button>
                    </Card.Header>
                    <Card.Body>
                    <Table bordered='true' hover='true' size="sm">
                            <thead>
                                {this.getTableHeaderRow()}
                            </thead>
                            <tbody>
                                {
                                    team.map((player,index)=>this.getTableRow(player,index))
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