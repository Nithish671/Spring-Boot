package com.example.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.model.Student;
import com.example.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	StudentRepository studentRepository;
	
	public List<Student> getAllStudents() {
		
		List<Student> students = new ArrayList<>();
		
		studentRepository.findAll().forEach(student -> students.add(student));
		
		return students;
	}
	
	public Student getStudentById(int id) {
		return studentRepository.findById(id).get();
	}
	
	public boolean saveStudent(Student student) {
		boolean status = false;
		try {
		    studentRepository.save(student);
		    status = true;
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return status;
	}
	
	public boolean delete(int id) {
		boolean status = false;
		try {
			studentRepository.deleteById(id);
			status = true;
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return status;
	}
	
	public boolean update(Student student, int student_id) {
		
		boolean status = false;
		
		try {
			studentRepository.save(student);
			status = true;
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return status;
	}
	
}
