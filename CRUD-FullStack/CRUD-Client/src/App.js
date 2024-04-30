import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes
import StudentListComponent from './StudentListComponent';
import AddStudentComponent from './AddStudentComponent';


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/view-student" className="nav-link btn btn-primary active">View Student</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-student" className="nav-link btn btn-primary active" style={{ marginLeft: '10px' }}>Add Student</Link>
            </li>
          </ul>
        </nav>
        <Routes> 
          <Route path="/view-student" element={<StudentListComponent />} />
          <Route path="/add-student" element={<AddStudentComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
