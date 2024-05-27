import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "../components/StudentForm";
import { useParams } from "react-router-dom";

const StudentEdit = ({ show, handleClose }) => {
    const [initialValues, setInitialValues] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/students/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setInitialValues(res.data);
                } else {
                    throw new Error("Student not found");
                }
            })
            .catch((err) => {
                alert(err.message);
                handleClose();
            });
    }, [id]);

    const handleSubmit = (values) => {
        axios
            .put(`/api/students/${id}`, values)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully updated");
                    handleClose();
                } else {
                    throw new Error("Failed to update student");
                }
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div>
            {show && initialValues && (
                <StudentForm initialValues={initialValues} onSubmit={handleSubmit}>
                    Update Student
                </StudentForm>
            )}
        </div>
    );
};

export default StudentEdit;
