package com.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Student;
import com.example.service.StudentService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value="/api")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@PostMapping("save-student")
	public boolean saveStudent(@RequestBody Student student) {
		return studentService.saveStudent(student);
	}

	@GetMapping("students-list")
	public List<Student> getStudents() {
		return studentService.getAllStudents();
	}
	
	@DeleteMapping("delete-student/{student_id}")
	public boolean deleteStudent(@PathVariable("student_id") int student_id, Student student) {
		student.setStudent_id(student_id);
		return studentService.delete(student_id);
	}
	
	@GetMapping("student/{student_id}")
	public Student getStudentById(@PathVariable("student_id") int student_id, Student student) {
		student.setStudent_id(student_id);
		return studentService.getStudentById(student_id);
	}
	
	@PostMapping("update-student/{student_id}")
	public boolean updateStudent(@RequestBody Student student, @PathVariable("student_id") int student_id) {
		student.setStudent_id(student_id);
		return studentService.update(student, student_id);
	}
}
