import React, { useState ,useEffect}  from 'react';
import Axios from'axios';
import {clone, cloneDeep} from 'lodash' ;
import Constants from '../../helpers/Constants';
import { Button} from 'react-bootstrap';
import ReactDataGrid from 'react-data-grid';
import './Grid.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-toastify';


const FilterToolBar = (props)=>{
    return(
        <div>
            <Button onClick={()=>props.onToggleFilter()} style={{float:'right'}}>
                Filter
            </Button>
        </div>
    )
}

const AllPlayers = ()=>{

    const [players,setPlayers]= useState([]);
    const [filteredPlayers,setFilteredPlayers]= useState([]);
    const [filter,setFilter]=useState({});

    const columns = [
        {key:'srNo',name :'Sr. No'},
        { key: 'playerId', name: 'Player ID', sortable:true,filterable : true},
        { key: 'name', name: 'Player Name' ,sortable:true,filterable : true},
        { key:'grade',name : 'Grade',sortable:true,filterable : true},
        { key: 'team', name: 'Team' ,sortable:true,filterable :true},
        { key: 'soldTo', name: 'Sold To' ,sortable:true,filterable : true} ,
        { key: 'soldAt', name: 'Price' ,sortable:true} ,
    ]

    const getAllPlayerData=()=>{
        Axios.get(Constants.urls.getAllPlayersData).then(
            (res)=> {
                setPlayers(res.data)
                setFilteredPlayers(res.data);
            },
            (err)=>{
                if(err && err.response && err.response.data && err.response.data.message){
                    toast.error(err.response.data.message);
                  }
            }
        )
    }

    useEffect(() => {
        getAllPlayerData()
    }, [])


    const filterRows=()=> {
        var filteredRows = clone(players);
        Object.keys(filter).forEach(filterKey=>{
            const term = filter[filterKey].filterTerm;
            filteredRows = filteredRows.filter((value)=>{
                return value[filterKey] && (value[filterKey].toString().toLowerCase()).indexOf(term.toLowerCase())>-1
            });
        })
        setFilteredPlayers(filteredRows);
    }

    const asExcell=()=>{
        try{
            const filteredPlayersCopy = cloneDeep(filteredPlayers);
            var CsvString = "Player Id,Name,grade,Team,Sold At,Sold To,Bids\r\n";
            filteredPlayersCopy.forEach(function(RowItem) {
                for(var key in RowItem){
                    CsvString += JSON.stringify(RowItem[key]).replace(/\,/g,'') + ',';
                }
                CsvString += "\r\n";
            });
            CsvString = "data:application/csv," + encodeURIComponent(CsvString);
            var x = document.createElement("A");
            x.setAttribute("href", CsvString );
            x.setAttribute("download","WCauction1.csv");
            document.body.appendChild(x);
            x.click();
        }
        catch(e){
            console.log(e);
        }
    }

    const asPdf = ()=>{
        
        try{
            const doc = new jsPDF();
            doc.autoTable({
                head: [['ID','Player Name','grade','Team','Sold At','Sold To','\r\n']],
                body:filteredPlayers.map(player=>
                    [
                        player.playerId,
                        player.name,
                        player.grade,
                        player.team,
                        player.soldAt,
                        player.soldTo
                    ]
                )
            });
            doc.save('summary.pdf');
        }
        catch(e){
            console.log(e);
        }
    }

    const sortRows = ( sortColumn, sortDirection) =>  {
        if(sortDirection === "NONE"){ 
            setFilteredPlayers(filteredPlayers);
        }
        const comparer = (a, b) => { 
            if (sortDirection === "ASC") {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else if (sortDirection === "DESC") {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        };
        const xyz = cloneDeep(filteredPlayers.sort(comparer))
        setFilteredPlayers(xyz)
    };
        
    const onFilterChange = (newFilter) => {
        const oldFilter = filter;
        const key = newFilter.column.key;
        if (newFilter.filterTerm) {
        oldFilter[key] = newFilter;
        } else {
        delete oldFilter[key];
        }
        setFilter(filter);
        filterRows();
    };


    if(players&& players.length === 0){
        return <></>
    }
    
    return <div>
        <h2 style={{display:'inline-block'}}>
            All PLayers Data 
        </h2>
        {/* {console.log(players,filter)} */}
        &nbsp;
        <Button variant={'info'} style={{float:'right',marginLeft:'4px'}} onClick={asPdf}>
            Download PDF
        </Button>
        &nbsp;
        <Button variant={'info'} style={{float:'right',marginLeft:'4px'}} onClick={asExcell}>
            Download Excell
        </Button>
        &nbsp;
        <Button variant={'info'} style={{float:'right',marginLeft:'4px'}} onClick={getAllPlayerData}>
            Refresh Data
        </Button>
        &nbsp;
        <ReactDataGrid
            columns={columns}
            rowGetter={i => ({
                                srNo:i+1,
                                ...filteredPlayers[i]
                            })}
            rowsCount={filteredPlayers.length}
            minHeight={500}
            toolbar={<FilterToolBar/>}
            onGridSort={(sortColumn, sortDirection) => sortRows(sortColumn, sortDirection)}
            onAddFilter={newFilter => onFilterChange(newFilter)}
            onClearFilters={() => setFilter({})}
        />
    </div>
}


export default AllPlayers;