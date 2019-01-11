import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import createStyles from '@material-ui/core/styles/createStyles';
import {Theme, WithStyles} from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import {getSorting, IColumnConfig, stableSort} from './utils';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        table: {},
        tableWrapper: {
            overflowX: 'auto',
        },
        checkBox: {
            width: 80
        },
    });

interface IProps extends WithStyles<typeof styles> {
    useCheckBox: boolean
    columns: IColumnConfig[]
    data: any[]
    useHeader: boolean
    renderRow?: (data: any) => any
}

const emptyArray: any[] = []

class XTable extends React.Component <IProps, any> {
    public state = {
        order: 'asc',
        orderBy: 'calories',
        query: '',
        selected: emptyArray,
        data: this.props.data,
        page: 0,
        rowsPerPage: 5
    }

    public render() {
        const {classes, columns, useCheckBox, renderRow, useHeader} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const sortOder: 'asc' | 'desc' = order === 'desc' ? 'desc' : 'asc'
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onChange={this.handleSearch}
                    handleSelection={this.clearSelection}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby='tableTitle'>
                        {
                            useHeader &&
                            <EnhancedTableHead
                                columns={columns}
                                numSelected={selected.length}
                                order={sortOder}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                useCheckBox={useCheckBox}
                            />
                        }
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={this.handleClick.bind(this, n.id)}
                                            role='checkbox'
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}

                                        >
                                            {
                                                useCheckBox &&
                                                <TableCell
                                                    padding='checkbox'
                                                    className={classes.checkBox}>
                                                    <Checkbox checked={isSelected}/>
                                                </TableCell>
                                            }
                                            {
                                                columns.map(it => {
                                                    return <TableCell padding={useCheckBox ? 'none' : 'checkbox'}
                                                                      key={it.name}
                                                                      component='th' scope='row'
                                                    >
                                                        {renderRow ? renderRow(n) : n[it.name]}
                                                    </TableCell>
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }

    private handleRequestSort = (event: any, property: any) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    private handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            this.setState((state: any) => ({selected: state.data.map((n: any) => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    private handleClick = (id: any) => {
        const selected = this.state.selected as any[];
        const selectedIndex = selected.indexOf(id);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    private handleChangePage = (event: any, page: any) => {
        this.setState({page});
    };
    private clearSelection = () => {
        this.setState(()=>({selected:[]}));
    };

    private handleChangeRowsPerPage = (event: any) => {
        this.setState({rowsPerPage: event.target.value});
    };

    private handleSearch = (event: any) => {
        this.setState({query: event.target.value});
    };
    private isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;
}

export default withStyles(styles)(XTable);
