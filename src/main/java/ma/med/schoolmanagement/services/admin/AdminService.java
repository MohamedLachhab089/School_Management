package ma.med.schoolmanagement.services.admin;

import ma.med.schoolmanagement.dtos.FeeDto;
import ma.med.schoolmanagement.dtos.SingleStudentDto;
import ma.med.schoolmanagement.dtos.StudentDto;

import java.util.List;

public interface AdminService {
    StudentDto postStudent(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    void deleteStudent(Long studentId);

    SingleStudentDto getStudentById(Long studentId);

    StudentDto updateStudent(Long studentId, StudentDto studentDto);

    FeeDto payFee(Long studentId, FeeDto feeDto);
}
