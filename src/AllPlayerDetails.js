import React, { useState }  from 'react';
import _ from 'lodash';
import Axios from'axios';
import { getJwtToken, getHeaderObject } from './util';
import Constants from './Constants';
import { Table ,Card, Button} from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
// import { Toolbar, Data } from "react-data-grid-addons";
import './Grid.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// const selectors = Data.Selectors;
const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    const comparer = (a, b) => {
        if (sortDirection === "ASC") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    };
    return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    return newFilters;
  };

const columns = [
    { key: 'playerId', name: 'Player ID', sortable:true,filterable : true},
    { key: 'name', name: 'Player Name' ,sortable:true,filterable : true},
    { key : 'grade',name:'Grade',sortable:true,filterable :true},
    { key: 'team', name: 'IPL Team' ,sortable:true,filterable :true},
    { key: 'soldTo', name: 'Sold To' ,sortable:true,filterable : true} ,
    { key: 'nationality', name: 'Nationality' ,sortable:true,filterable : true} ,
    { key: 'soldAt', name: 'Price' ,sortable:true} 
]

function getRows(rows, filters) {
    return rows;
    // return selectors.getRows({ rows, filters });
}

function Grid({ players }) {
    const [rows, setRows] = useState(players);
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            minHeight={500}
            // toolbar={<Toolbar enableFilter={true} />}
            onGridSort={(sortColumn, sortDirection) => setRows(sortRows(players, sortColumn, sortDirection))}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
      />
    );
}

class AllPlayerDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            players : []
        }
    }

    componentDidMount(){
        this.getAllPlayerData();
    }
    
    getAllPlayerData(){
        Axios.get(Constants.BASE_URL + '/allPlayers',getHeaderObject()).then(
            (res)=>{
                this.setState({players:res.data})
            },(err)=>{
                console.error(err);
            }
        )
    }

    refreshDataHandler= ()=>{

        this.getAllPlayerData();
    }
    
    download (){
        try{
            const doc = new jsPDF();

            doc.autoTable({
                head: [['ID','Player Name','Team','Sold At','Sold To','Grade','Nationality']],
                body:this.state.players.map(player=>
                    [
                        player.playerId,
                        player.name,
                        player.team,
                        player.soldAt,
                        player.soldTo,
                        player.grade,
                        player.nationality
                    ]
                )
            });
            doc.save('summary.pdf');
        }
        catch(e){

        }
    }

    render(){
        var players = this.state.players;
        if(players &&players.length>0){
            return(
                <div>
                    <h2 style={{display:'inline-block'}}>
                        All PLayers Data 
                    </h2>
                    &nbsp;
                    <Button variant={'info'} style={{float:'right'}} onClick={this.download.bind(this)}>
                        Download Summary
                    </Button>
                    <span style={{float:'right'}}>&nbsp;</span>
                    <Button variant={'info'} style={{float:'right'}} onClick={this.refreshDataHandler.bind(this)}>
                        Refresh Data
                    </Button>
                    <Grid players={players}/>
                </div>
            )
        }
        return null;
    }
}

export default AllPlayerDetails;

