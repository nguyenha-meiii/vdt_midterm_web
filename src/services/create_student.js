import React from "react";
import axios from "axios";
import StudentForm from "../components/StudentForm";

const StudentCreate = ({ show, handleClose }) => {
    const handleSubmit = async (values) => {
        try {
            const res = await axios.post("/api/students", values);
            if (res.status === 200) {
                alert("Student successfully created");
                handleClose();
                window.location.reload();
            } else {
                throw new Error(`Unexpected response status: ${res.status}`);
            }
        } catch (err) {
            console.error("API request failed:", err); // Log the error for debugging
            if (err.response) {
                // Server responded with a status other than 200
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
                console.error("Response headers:", err.response.headers);
            } else if (err.request) {
                // Request was made but no response was received
                console.error("Request data:", err.request);
            } else {
                // Something happened in setting up the request
                console.error("Error message:", err.message);
            }
            alert("Something went wrong");
        }
    };

    return (
        <div>
            {show && (
                <StudentForm
                    initialValues={{ fullName: "", doB: "", gender: "", school: "", major: "" }}
                    onSubmit={handleSubmit}
                >
                    Create Student
                </StudentForm>
            )}
        </div>
    );
};

export default StudentCreate;
