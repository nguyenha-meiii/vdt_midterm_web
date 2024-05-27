import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const StudentDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        axios
            .delete(`/api/students/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully deleted");
                    navigate("/");
                } else {
                    return Promise.reject();
                }
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <div>
            <h3>Are you sure you want to delete this student?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => navigate("/")}>No</button>
        </div>
    );
};

export default StudentDelete;
