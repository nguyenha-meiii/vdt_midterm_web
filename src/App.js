import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentTable from './components/StudentTable';
import StudentCreate from './services/create_student';
import StudentEdit from './services/edit_student';
import StudentDelete from './services/delete_student';
import StudentList from './services/list_student';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [students, setStudents] = useState([]);

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleCreateModalShow = () => setShowCreateModal(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/students/${id}`);
      if (response.status === 200) {
        alert('Student successfully deleted');
        setStudents(students.filter(student => student._id !== id));
      } else {
        alert('Failed to delete student');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <Router>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Student List</h1>
        <Button variant="primary" onClick={handleCreateModalShow} style={{ marginBottom: "10px" }}>
          Add Student
        </Button>
        <StudentCreate show={showCreateModal} handleClose={handleCreateModalClose} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <StudentTable
                students={students}
                handleDelete={handleDelete}
                handleCreateModalShow={handleCreateModalShow}
              />
            }
          />
          <Route path="/list-student/:id" element={<StudentList />} />
          <Route path="/edit-student/:id" element={<StudentEdit show handleClose={handleCreateModalClose} />} />
          <Route path="/delete-student/:id" element={<StudentDelete />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
