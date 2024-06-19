package ma.med.schoolmanagement.controllers;

import ma.med.schoolmanagement.dtos.StudentDto;
import ma.med.schoolmanagement.services.admin.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;


    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/student")
    public ResponseEntity<?> addStudent(@RequestBody StudentDto studentDto){
        StudentDto createStudentDto = adminService.postStudent(studentDto);
        if (createStudentDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createStudentDto);
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> allStudents = adminService.getAllStudents();
        return ResponseEntity.ok(allStudents);
    }

    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId){
        adminService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

}