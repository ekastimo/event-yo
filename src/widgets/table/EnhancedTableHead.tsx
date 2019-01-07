import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)'},
    {id: 'calories', numeric: true, disablePadding: false, label: 'Calories'},
    {id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)'},
    {id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)'},
    {id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)'},
];

interface IHeaderProps {
    numSelected: number
    onRequestSort: (event: any, property: any) => any,
    onSelectAllClick: (event: any) => any
    order?: 'asc' | 'desc'
    orderBy: string
    rowCount: number
}

export default class EnhancedTableHead extends React.Component<IHeaderProps> {
    public createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    };

    public render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                // align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
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

