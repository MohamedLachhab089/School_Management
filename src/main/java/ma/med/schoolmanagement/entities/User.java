package ma.med.schoolmanagement.entities;

import jakarta.persistence.*;
import lombok.Data;
import ma.med.schoolmanagement.dtos.StudentDto;
import ma.med.schoolmanagement.enums.UserRole;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String fatherName;
    private String motherName;
    private String StudentClass;
    private Date dob;
    private String address;
    private String gender;
    private UserRole role;

    public StudentDto getStudentDto() {
        StudentDto studentDto = new StudentDto();
        studentDto.setId(id);
        studentDto.setName(name);
        studentDto.setEmail(email);
        studentDto.setAddress(address);
        studentDto.setDob(dob);
        studentDto.setStudentClass(StudentClass);
        studentDto.setGender(gender);
        studentDto.setFatherName(fatherName);
        studentDto.setMotherName(motherName);
        return studentDto;
    }
}
