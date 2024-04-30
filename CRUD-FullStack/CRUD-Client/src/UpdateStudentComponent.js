import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateStudentComponent({ studentId }) {
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_branch: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/student/${studentId}`)
      .then(response => {
        setFormData({
          student_name: response.data.student_name,
          student_email: response.data.student_email,
          student_branch: response.data.student_branch
        });
      })
      .catch(error => {
        console.error('Error fetching student: ', error);
      });
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/update-student/${studentId}`, formData)
      .then(response => {
        console.log(response.data);
        if (response.data === true) {
          setUpdateSuccess(true);
        } else {
          setUpdateSuccess(false);
        }
      })
      .catch(error => {
        console.error('Error updating student: ', error);
        setUpdateSuccess(false);
      });
  };

  return (
    <div>
      <h3>Update Student</h3>
      {updateSuccess && <div className="alert alert-success">Student updated successfully!</div>}
      {!updateSuccess && updateSuccess !== null && <div className="alert alert-danger">Updating student failed.</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_name">Student Name</label>
          <input type="text" className="form-control" id="student_name" name="student_name" value={formData.student_name} onChange={handleChange} placeholder="Enter Student Name" />
        </div>
        <div className="form-group">
          <label htmlFor="student_email">Student Email</label>
          <input type="email" className="form-control" id="student_email" name="student_email" value={formData.student_email} onChange={handleChange} placeholder="Enter Student Email" />
        </div>
        <div className="form-group">
          <label htmlFor="student_branch">Student Branch</label>
          <select className="form-control" id="student_branch" name="student_branch" value={formData.student_branch} onChange={handleChange}>
            <option value="B-Tech">B-Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="M-Tech">M-Tech</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default UpdateStudentComponent;
