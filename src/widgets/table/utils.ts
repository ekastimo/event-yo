export function desc(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function stableSort(array: any[], cmp: any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export function getSorting(order: string, orderBy: any) {
    return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
}


let counter = 0;

export function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    counter += 1;
    return {id: counter, name, calories, fat, carbs, protein};
}



export interface IColumnConfig {
    name: string
    numeric: boolean
    disablePadding: boolean
    label: string
}

export const dummyColumns: IColumnConfig[] = [
    {name: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)'},
    // {name: 'calories', numeric: true, disablePadding: false, label: 'Calories'},
    // {name: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)'},
    // {name: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)'},
    // {name: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)'},
];

export const dummyData = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0)
]
