package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name="student")
public class Student {

	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int student_id;
	
	@Column
	private String student_name;
	
	@Column
	private String student_email;
	
	@Column
	private String student_branch;
	
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	
	public int getStudent_id() {
		return student_id;
	}
	
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	
	public String getStudent_name() {
		return student_name;
	}
	
	public void setStudent_email(String student_email) {
		this.student_email = student_email; 
	} 
	
	public String getStudent_email() {
		return student_email;
	}
	
	public void setStudent_branch(String student_branch) {
		this.student_branch = student_branch;
	}
	
	public String getStudent_branch() {
		return student_branch;
	}
}
