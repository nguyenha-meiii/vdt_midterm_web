import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentList = () => {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/students/${id}`).then((res) => {
            if (res.status === 200) {
                setStudent(res.data);
            } else {
                alert("Student not found");
            }
        });
    }, [id]);

    return (
        <div>
            {student ? (
                <div>
                    <h3>{student.fullName}</h3>
                    <p>Year of Birth: {student.doB}</p>
                    <p>Gender: {student.gender}</p>
                    <p>School: {student.school}</p>
                    <p>Major: {student.major}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StudentList;
