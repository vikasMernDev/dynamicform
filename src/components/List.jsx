import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function List() {

    const [items, setItems] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setItems(items);
        }
    }, []);
    console.log("ddd", items)
    function createData(firstName, lastName, email, phone, dob) {
        return { firstName, lastName, email, phone, dob };
    }

    const rows = items.map((item) =>
        createData(item.firstName, item.lastName, item.email, item.phone, item.dob)
    );

    const handleDelete = (index) => {
        window.alert('Are you Sure')
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem('user', JSON.stringify(updatedItems));
        console.log('ddd')
    }

    return (
        <div>
            <div className='table-header'>
                <div style={{ marginLeft: '20px' }}>
                    <h3>User List</h3>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <ButtonGroup>
                        <Link to={'/create-user'}>
                            <Button sx={{ color: 'black', fontWeight: 800 }}>Add User</Button>
                        </Link>
                    </ButtonGroup>
                </div>
            </div>
            <div className='abcw'>
                <TableContainer className='abc'>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>FirstName</StyledTableCell>
                                <StyledTableCell align="right">LastName</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Phone</StyledTableCell>
                                <StyledTableCell align="right">DOB</StyledTableCell>
                                <StyledTableCell align="center">Actions&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.firstName}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.firstName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                                    <StyledTableCell align="right">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="right">{row.dob}</StyledTableCell>
                                    <ButtonGroup sx={{ ml: 20 }}>
                                        <Link to={`/update-user/${index}`}>
                                            <Button>Update</Button>
                                        </Link>
                                        <Button type='submit' onClick={() => handleDelete(index)}>Delete</Button>
                                    </ButtonGroup>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}