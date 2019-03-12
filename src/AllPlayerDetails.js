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
import { toast } from 'react-toastify';

// const selectors = Data.Selectors;

class Toolbar extends React.Component{
    render(){
        return(<div><Button onClick={()=>this.props.onToggleFilter(this.abc)} style={{float:'right'}}>Filter</Button></div>)
    }
}

class AllPlayerDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            players : [],
            dPlayers : [],
            sortedPlayers : [],
            filteredPlayers : [],
            filters : {}
        }

        this.columns = [
            { key: 'playerId', name: 'Player ID', sortable:true,filterable : true},
            { key: 'name', name: 'Player Name' ,sortable:true,filterable : true},
            { key : 'grade',name:'Grade',sortable:true,filterable :true},
            { key: 'team', name: 'IPL Team' ,sortable:true,filterable :true},
            { key: 'soldTo', name: 'Sold To' ,sortable:true,filterable : true} ,
            { key: 'nationality', name: 'Nationality' ,sortable:true,filterable : true} ,
            { key: 'soldAt', name: 'Price' ,sortable:true} 
        ]
    }

    componentDidMount(){
        this.getAllPlayerData();
    }
    
    getAllPlayerData(){
        Axios.get(Constants.BASE_URL + '/allPlayers',getHeaderObject()).then(
            (res)=>{
                this.setState({players:res.data,dPlayers:res.data})
            },(err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
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
                body:this.state.filteredPlayers.map(player=>
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

    setdPlayers(dPlayers){
        this.setState({dPlayers});
    }

    getRows(rows, filters) {
        var filteredRows = rows;
        Object.keys(filters).map(filterKey=>{
            const term = filters[filterKey].filterTerm;
            filteredRows = filteredRows.filter((value)=>{
                return value[filterKey] && (value[filterKey].toString()).indexOf(term)>-1
            });
        })
        return filteredRows;
    }

    sortRows = (initialRows, sortColumn, sortDirection) =>  {
        const comparer = (a, b) => { 
            if (sortDirection === "ASC") {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        };
        
        return sortDirection === "NONE" ? initialRows : initialRows.sort(comparer);
    };

    handleFilterChange = filter => filters => {
        const newFilters = { ...filters };
        if (filter.filterTerm) {
          newFilters[filter.column.key] = filter;
        } else {
          delete newFilters[filter.column.key];
        }
        return newFilters;
    };

    setFilters(filters){
        this.setState({filters});
    }

    render(){
        var players = this.state.players;
        const dPlayers = this.state.dPlayers;
        const filters = this.state.filters;
        const filteredRows = this.getRows(dPlayers, filters);
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
                    {/* <span style={{float:'right'}}>&nbsp;</span>
                    <Button variant={'info'} style={{float:'right'}} onClick={this.refreshDataHandler.bind(this)}>
                        Filter
                    </Button> */}
                    {/* <Grid players={players}/> */}
                    <ReactDataGrid
                        columns={this.columns}
                        rowGetter={i => filteredRows[i]}
                        rowsCount={filteredRows.length}
                        minHeight={500}
                        toolbar={<Toolbar/>}
                        onGridSort={(sortColumn, sortDirection) => this.setdPlayers(this.sortRows(players, sortColumn, sortDirection))}
                        onAddFilter={filter => this.setFilters(this.handleFilterChange(filter))}
                        onClearFilters={() => this.setFilters({})}
                    />
                </div>
            )
        }
        return null;
    }
}

export default AllPlayerDetails;

