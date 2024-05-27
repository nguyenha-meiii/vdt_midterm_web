import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const StudentTable = ({ students, handleDelete, handleCreateModalShow }) => {
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit-student/${id}`);
    };

    const columns = [
        { field: "no", headerName: "No", flex: 0.3 },
        { field: "fullName", headerName: "Full Name", flex: 1 },
        { field: "doB", headerName: "Year of Birth", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "school", headerName: "School", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button variant="primary" onClick={() => handleEdit(params.id)}>
                        Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDelete(params.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setRows(
            students.map((student, index) => ({
                id: student._id,
                no: index + 1,
                fullName: student.fullName,
                doB: student.doB,
                gender: student.gender,
                school: student.school,
            }))
        );
        setIsLoading(false);
    }, [students]);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default StudentTable;
