import React, { useState } from 'react';
import axios from 'axios';

function AddStudentComponent() {

    const initialData = {
        student_name: '',
        student_email: '',
        student_branch: ''
    };

  const [formData, setFormData] = useState(initialData);
  const [addSuccess, setAddSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/save-student', formData)
      .then(response => {
        console.log(response.data);
        if (response.data === true) {
          setAddSuccess(true);
          setFormData(initialData);
        } else {
          setAddSuccess(false);
        }
      })
      .catch(error => {
        console.error('Error adding student: ', error);
        setAddSuccess(false);
      });
  };

  return (
    <div>
      <h3>Create Student</h3>
      {addSuccess && <div className="alert alert-success">Student added successfully!</div>}
      {!addSuccess && addSuccess !== null && <div className="alert alert-danger">Adding student failed.</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_name">Student Name</label>
          <input type="text" className="form-control" id="student_name" name="student_name" value={formData.student_name} onChange={handleChange} placeholder="Enter Student Name" required />
        </div><br />
        <div className="form-group">
          <label htmlFor="student_email">Student Email</label>
          <input type="email" className="form-control" id="student_email" name="student_email" value={formData.student_email} onChange={handleChange} placeholder="Enter Student Email" required />
        </div><br />
        <div className="form-group">
          <label htmlFor="student_branch">Student Branch</label>
          <select className="form-control" id="student_branch" name="student_branch" value={formData.student_branch} onChange={handleChange} required >
            <option value="">---Select Department---</option>
            <option value="B-Tech">B-Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="M-Tech">M-Tech</option>
          </select>
        </div><br />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default AddStudentComponent;
