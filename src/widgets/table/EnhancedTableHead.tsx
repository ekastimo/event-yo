import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import {IColumnConfig} from './utils';


interface IHeaderProps {
    numSelected: number
    onRequestSort: (event: any, property: any) => any,
    onSelectAllClick: (event: any) => any
    order?: 'asc' | 'desc'
    orderBy: string
    rowCount: number
    columns: IColumnConfig[]
    useCheckBox: boolean
}

export default class EnhancedTableHead extends React.Component<IHeaderProps> {
    public createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    };

    public render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, columns, useCheckBox} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {
                        useCheckBox &&
                        <TableCell padding='checkbox'>
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                            />
                        </TableCell>
                    }

                    {columns.map(row => {
                        return (
                            <TableCell
                                key={row.name}
                                // align={row.numeric ? 'right' : 'left'}
                                padding={!useCheckBox ? 'checkbox' : row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.name ? order : false}
                            >
                                <Tooltip
                                    title='Sort'
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.name}
                                        direction={order}
                                        onClick={this.createSortHandler(row.name)}
                                    >
                                        <Typography variant='button'>{row.label}</Typography>

                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

