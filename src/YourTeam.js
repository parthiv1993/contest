import React from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
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
        Axios.get(Constants.BASE_URL + '/myTeam',getHeaderObject()).then(
            (res)=>{
                if(!_.isEqual(res.data,this.state.team)){
                    this.setState({team:res.data})
                }
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
                console.error(err);
            }
        )
    }

    onRefreshHandler(){
        this.getYourTeam();
    }


    getTeamColour(team){
        const obj ={
            India : '#4286f4',
            Pakistan : '#6fce6f',
            Australia : '#eded25',
            Afghanistan : '#1455a9',
            'South Africa' : '#82bd63',
            'West Indies' : '#932a52',
            'New Zealand': '#080b0e',
            Bangladesh :'#82bd63',
            'Sri Lanka':'#0061f6',
            England : '#3b5667'
        }
        return obj[team];
    }

    getTeamTextColor(team){
        const obj = {
            India : 'White',
            Pakistan : 'White',
            Australia : 'limegreen',
            Afghanistan : 'Black',
            'South Africa' : 'Yellow',
            'West Indies' : 'White',
            'New Zealand': 'White',
            Bangladesh :'#174400',
            'Sri Lanka':'Yellow',
            England : 'White'
        }
        return obj[team];
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
                        {/* <div className='legend'>
                            <ul style={ {listStyle: 'none' }}>
                                <li style={{ float: 'left',marginRight: '10px' }}>
                                    <span style={{ border: '1px solid #ccc',float: 'left', width: '24px', height: '24px', margin: '2px',backgroundColor:'cornflowerblue' }}>
                                     </span>
                                     <span>Indian</span>
                                </li>
                                <li style={{ float: 'right',marginRight: '10px' }}>
                                    <span style={{ border: '1px solid #ccc',float: 'left', width: '24px', height: '24px', margin: '2px',backgroundColor:'palevioletred' }}>
                                     </span>
                                     <span>Overseas</span>
                                </li>
                            </ul>
                        </div> */}
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
                                                <td style={{backgroundColor:`${this.getTeamColour(player.team)}`,color:`${this.getTeamTextColor(player.team)}`}}>
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