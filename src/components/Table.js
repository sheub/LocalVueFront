import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
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
        background: "rgba(0, 0, 0, 0.1)",
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

    isset = (ref) => typeof ref !== "undefined";

    render() {
        const { classes, data } = this.props;
        var tempData = data;
        const { resultData } = this.props;
        let tableActive = this.props.tableActive;
        if (!this.isset(tempData) && this.isset(resultData)) {
            tempData = resultData;
            tableActive = true;
        }

        if (!tableActive || !this.isset(tempData)) {
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
                            {Object.entries(tempData).map((row) => {
                                var isNotLink = row[1].link === "Please sign in" || row[1].link === " - ";
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
                                        {isNotLink ? (
                                            <CustomTableCell> {row[1].link} </CustomTableCell>
                                        ) : (
                                            <CustomTableCell ><a href={row[1].link} target="_blank" rel="noopener noreferrer">Link</a> </CustomTableCell>
                                        )}
                                        {/* dangerouslySetInnerHTML={{ __html: row[1].link }} */}
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
    resultData: PropTypes.object,
};

// const mapStateToProps = ({ resultData }) => ({ resultData });
var mapStateToProps = (state) => {
    return {
        resultData: state.appReducer.resultData,
    };
};



export default connect(mapStateToProps)(withStyles(styles)(CustomizedTable));
