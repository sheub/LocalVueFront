import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "./table.css";

const CustomTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = (theme) => ({
    webkitScrollbar: {
        background: rgba(0, 0, 0, 0.1),
        borderLeft: 0,
        height: 3,
        width: 3,
      },
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
    row: {
        "&:nth-of-type(odd)": {
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
        else {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Provider</CustomTableCell>
                                <CustomTableCell >Title</CustomTableCell>
                                <CustomTableCell >Address</CustomTableCell>
                                <CustomTableCell >Categories</CustomTableCell>
                                <CustomTableCell >Phone</CustomTableCell>
                                <CustomTableCell >Website</CustomTableCell>
                                <CustomTableCell >url</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(data).map((row) => {
                                return (
                                    <TableRow className={classes.row} key={row[0]}>
                                        <CustomTableCell component="th" scope="row">
                                            {row[0]}
                                        </CustomTableCell>
                                        <CustomTableCell >{row[1].title}</CustomTableCell>
                                        <CustomTableCell >{row[1].address}</CustomTableCell>
                                        <CustomTableCell >{row[1].categories}</CustomTableCell>
                                        <CustomTableCell style={{ whiteSpace: "nowrap" }}>{row[1].phone}</CustomTableCell>
                                        <CustomTableCell >{row[1].website}</CustomTableCell>
                                        <CustomTableCell dangerouslySetInnerHTML={{ __html: row[1].url }}></CustomTableCell>
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
