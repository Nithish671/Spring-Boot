import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentListComponent() {
  const [students, setStudents] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/students-list')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students: ', error);
      });
  }, []);

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8080/api/delete-student/${id}`)
      .then(response => {
        console.log(response.data);
        setStudents(students.filter(student => student.student_id !== id));
      })
      .catch(error => {
        console.error('Error deleting student: ', error);
      });
  };

  const showUpdateStudentForm = (student) => {
    setUpdateFormData(student);
    setShowUpdateForm(true);
  };

  const updateStudent = () => {
    axios.post('http://localhost:8080/api/save-student', updateFormData)
      .then(response => {
        console.log(response.data);
        setShowUpdateForm(false);
      })
      .catch(error => {
        console.error('Error updating student: ', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h1 style={{ textAlign: 'center' }}>Students</h1>
      </div>
      <div className="panel-body">
        {showUpdateForm && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Update Student</h2>
              <form onSubmit={updateStudent}>
                <div className="form-group">
                  <label htmlFor="student_name">Student Name</label>
                  <input type="text" className="form-control" id="student_name" name="student_name" value={updateFormData.student_name} onChange={handleChange} required />
                </div><br />
                <div className="form-group">
                  <label htmlFor="student_email">Student Email</label>
                  <input type="email" className="form-control" id="student_email" name="student_email" value={updateFormData.student_email} onChange={handleChange} required />
                </div><br />
                <div className="form-group">
                  <label htmlFor="student_branch">Student Branch</label>
                  <select className="form-control" id="student_branch" name="student_branch" value={updateFormData.student_branch} onChange={handleChange} required>
                    <option value="">---Select Department---</option>
                    <option value="B-Tech">B-Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="M-Tech">M-Tech</option>
                  </select><br />
                </div>
                <button type="submit" className="btn btn-success">Update</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowUpdateForm(false)} style={{ marginLeft: '10px' }}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <br /><br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Student Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.student_id}>
                <td>{student.student_name}</td>
                <td>{student.student_email}</td>
                <td>{student.student_branch}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => showUpdateStudentForm(student)}>Update</button>
                  <button onClick={() => deleteStudent(student.student_id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListComponent;
