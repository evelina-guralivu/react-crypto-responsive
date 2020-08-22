import React from 'react';
import PropTypes from "prop-types";
import {
  Table
} from "reactstrap";

const SimpleTable = ({
  tableContent,
  tableHeadings,
}) => {
  const renderTableHeader = () => {
    return tableHeadings.map((key, index) => {
       return <th key={index}>{key}</th>
    })
  };
  const renderTableData = () => {
    return tableContent.map((data, index) => {
        const { productName, amount, date } = data; //destructuring
       return (
          <tr key={index}>
             <td>{productName}</td>
             <td>{amount}</td>
             <td>{date}</td>
          </tr>
       )
    })
 };
 
  return (
    <Table
      className='simple-table'
      responsive
    >
      <thead>
        <tr className='table-head'>
          {renderTableHeader()}
        </tr>
      </thead>
      <tbody>
        {renderTableData()}
      </tbody>
    </Table>
  );
}

SimpleTable.propTypes = {
  tableContent: PropTypes.array,
  tableHeadings: PropTypes.array,
};

export default SimpleTable;