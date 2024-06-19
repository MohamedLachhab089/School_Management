package ma.med.schoolmanagement.services.admin;

import ma.med.schoolmanagement.dtos.StudentDto;

import java.util.List;

public interface AdminService {
    StudentDto postStudent(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    void deleteStudent(Long studentId);
}