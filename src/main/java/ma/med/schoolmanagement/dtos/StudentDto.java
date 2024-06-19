package ma.med.schoolmanagement.dtos;

import lombok.Data;
import ma.med.schoolmanagement.enums.UserRole;

import java.util.Date;

@Data
public class StudentDto {
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
}
