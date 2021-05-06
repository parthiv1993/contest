import React from 'react';
import { Table,Col } from 'react-bootstrap';

const DisplayAddedBids = (props)=>{

    const bids = props.bids;

    const getTableHeader=()=>{
        return  <tr>
                    <th>Bid By</th>
                    <th>Bid Amt</th>
                </tr>
    }

    const getTableRow=(bid)=>{
           return <tr key={bid.bidBy + bid.bidAmt}>
                    <td>{bid.bidBy}</td>
                    <td>{bid.bidAmt}</td>
                </tr>
    }

    if(bids && bids.length>0) {
        return(<>
            <Col sm={12}>
                <h4>Previous Bids:</h4>
                <Table striped={true} bordered={true} hover={true} size="sm">
                    <thead>
                        {getTableHeader()}
                    </thead>
                    <tbody>
                        {bids.map((bid)=>getTableRow(bid))}
                    </tbody>
                </Table>
            </Col>
        </>)
    }
    return (<div>You Can Start Bidding</div>);
}

export default  DisplayAddedBids;