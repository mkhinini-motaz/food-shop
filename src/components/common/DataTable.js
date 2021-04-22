import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
  },
});

function createHeaders(headers, headersColor) {
    let headersOutput = [];
    for (let index in headers) {
        headersOutput.push((
            <TableCell key={'datatable-header-cell-' + index} align="center" style={{ padding: '10px' }}>
                <span style={{ color: headersColor }}>
                    {headers[index]}
                </span>
            </TableCell>
        ));
    }

    return (
        <TableHead>
            <TableRow>
                {headersOutput}
            </TableRow>
        </TableHead>
    );
}

function createData(headers, items) {
    let uniqueKey = 1;
    let dataOutput = [];
    let tableCells;
    let rowKey;
    let cellKey;

    for (let item of items) {
        tableCells = [];
        for (let header of headers) {
            cellKey = 'datatable-cell-' + (item.id || uniqueKey++);

            if (! item[header]) {
                tableCells.push((
                    <TableCell key={cellKey} align="center" style={{ padding: '10px' }}></TableCell>
                ));
                continue;
            }

            tableCells.push((
                <TableCell key={cellKey} align="center" style={{ padding: '10px' }}>{item[header]}</TableCell>
            ));
        }

        rowKey = 'datatable-row-' + (item.id || uniqueKey++);
        dataOutput.push((
            <TableRow key={rowKey}>
                {tableCells}
            </TableRow>
        ));
    }

    return (
        <TableBody>
            {dataOutput}
        </TableBody>
    );
}

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
          {createHeaders(props.headers, props.headersColor)}

          {createData(props.headers, props.items)}
      </Table>
    </TableContainer>
  );
}
