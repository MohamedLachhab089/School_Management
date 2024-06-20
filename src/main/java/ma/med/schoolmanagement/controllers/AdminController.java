package ma.med.schoolmanagement.controllers;

import ma.med.schoolmanagement.dtos.FeeDto;
import ma.med.schoolmanagement.dtos.SingleStudentDto;
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
    public ResponseEntity<?> addStudent(@RequestBody StudentDto studentDto) {
        StudentDto createStudentDto = adminService.postStudent(studentDto);
        if (createStudentDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createStudentDto);
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> allStudents = adminService.getAllStudents();
        return ResponseEntity.ok(allStudents);
    }

    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        adminService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId) {
        SingleStudentDto singleStudentDto = adminService.getStudentById(studentId);
        if (singleStudentDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(singleStudentDto);
    }

    @PutMapping("/student/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudentDto = adminService.updateStudent(studentId, studentDto);
        if (updatedStudentDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedStudentDto);
    }

    /*@PostMapping("/fee/{studentId}")
    public ResponseEntity<?> payFee(@PathVariable Long studentId, @RequestBody FeeDto feeDto) {
        FeeDto paidFeeDto = adminService.payFee(studentId, feeDto);
        if (paidFeeDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(paidFeeDto);
    }*/

    @PostMapping("/fee/{studentId}")
    public ResponseEntity<?> payFee(@PathVariable Long studentId, @RequestBody FeeDto feeDto) {
        FeeDto paidFeeDto = adminService.payFee(studentId, feeDto);
        if (paidFeeDto == null) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(paidFeeDto);
    }


}
