import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class CustomizedTable extends Component {

    hideTable() {
        this.setState({ tableActive: false });
    }
    displayTable() {
        this.setState({ tableActive: true });
      }
    
    constructor(props) {
        super(props);

        this.state = {
            tableActive: this.props.tableActive,
        };
    }


    render() {
        const { classes, data } = this.props;
        let tableActive = this.props.tableActive;
        if (!tableActive) {
            return null;
          }
          else
          {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Provider</CustomTableCell>
                                <CustomTableCell >title</CustomTableCell>
                                <CustomTableCell >address</CustomTableCell>
                                <CustomTableCell >categories</CustomTableCell>                                
                                <CustomTableCell >phone</CustomTableCell>
                                <CustomTableCell >website</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(data).map(row => {
                                return (
                                    <TableRow className={classes.row} key={row[0]}>
                                        <CustomTableCell component="th" scope="row">
                                            {row[0]}
                                        </CustomTableCell>
                                        <CustomTableCell >{row[1].title}</CustomTableCell>
                                        <CustomTableCell >{row[1].address}</CustomTableCell>
                                        <CustomTableCell >{row[1].categories}</CustomTableCell>
                                        <CustomTableCell >{row[1].phone}</CustomTableCell>
                                        <CustomTableCell >{row[1].website}</CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);