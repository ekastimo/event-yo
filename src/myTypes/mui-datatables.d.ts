declare module 'mui-datatables' {
    interface CulumnOption {
        display: boolean
        filter: boolean
        sort: boolean
        customHeadRender: Function
        customBodyRender: Function
    }

    interface ColumnProps {
        name: string
        options?: Partial<CulumnOption>
    }

    type responsiveType = 'stacked' | 'scroll'

    type filterType = 'dropdown' | 'checkbox' | 'multiselect'

    // Localization
    interface TextLabels {
        body: Partial<{
            noMatch: string // "Sorry, no matching records found",
            toolTip: string // "Sort",
        }>
        pagination: Partial<{
            next: string // "Next Page",
            previous: string // "Previous Page",
            rowsPerPage: string // "Rows per page:",
            displayRows: string // "of",
        }>
        toolbar: Partial<{
            search: string // "Search",
            downloadCsv: string // "Download CSV",
            print: string // "Print",
            viewColumns: string // "View Columns",
            filterTable: string // "Filter Table",
        }>
        filter: Partial<{
            all: string // "All",
            title: string // "FILTERS",
            reset: string // "RESET",
        }>
        viewColumns: Partial<{
            title: string // "Show Columns",
            titleAria: string // "Show/Hide Table Columns",
        }>
        selectedRows: Partial<{
            text: string // "rows(s) selected",
            delete: string // "Delete",
            deleteAria: string // "Delete Selected Rows",
        }>
    }

    interface MuiDatatablesOptions {
        page: number
        count: number
        serverSide: boolean
        filterList: any[]
        rowsSelected: number[] // row index array
        filterType: filterType
        textLabels: Partial<TextLabels>
        pagination: boolean
        selectableRows: boolean
        resizableColumns: boolean
        customToolbar: () => React.ReactNode
        customToolbarSelect: (
            selectedRows: { data: React.ReactNode[][]; lookup: { [index: number]: boolean } }
        ) => React.ReactNode
        customFooter: (
            count: number,
            page: number,
            rowsPerPage: number,
            changeRowsPerPage: (rowsPerPage: number) => void,
            changePage: (page: number) => void
        ) => React.ReactNode
        caseSensitive: boolean
        responsive: responsiveType
        rowsPerPage: number
        rowsPerPageOptions: number[]
        rowHover: boolean
        sortFilterList: boolean
        sort: boolean
        filter: boolean
        search: boolean
        print: boolean
        download: boolean
        viewColumns: boolean
        onRowsSelect: Function
        onRowsDelete: Function
        onRowClick: (row: React.ReactNode[], rowMeta: { rowIndex: number; dataIndex: number }) => void
        onCellClick: (colIndex: number, rowIndex: number) => void
        onChangePage: (currentPage: number) => void
        onChangeRowsPerPage: (numberOfRows: number) => void
        onSearchChange: (searchText: string) => void
        onFilterChange: (changedColumn: string, filterList: any[]) => void
        onColumnSortChange: (changedColumn: string, direction: string) => void
        onColumnViewChange: (changedColumn: string, action: string) => void
        onServerRequest: (action: string, tableState: any) => void
    }

    interface MuiDatatablesProps {
        title: string
        data: React.ReactNode[][]
        columns: (string | ColumnProps)[]
        options?: Partial<MuiDatatablesOptions>
        className?: string
    }

    import * as React from 'react'
    const MUIDatatables: React.SFC<MuiDatatablesProps>
    export = MUIDatatables
}
