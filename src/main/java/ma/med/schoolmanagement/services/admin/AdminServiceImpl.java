package ma.med.schoolmanagement.services.admin;

import jakarta.annotation.PostConstruct;
import ma.med.schoolmanagement.dtos.SingleStudentDto;
import ma.med.schoolmanagement.dtos.StudentDto;
import ma.med.schoolmanagement.entities.User;
import ma.med.schoolmanagement.enums.UserRole;
import ma.med.schoolmanagement.repositories.UserRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepo userRepo;

    public AdminServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @PostConstruct // utilisée pour indiquer qu'une méthode doit être exécutée après que le bean a été initialisé.
    public void createAdminAccount() {
        User adminAccount = userRepo.findByRole(UserRole.ADMIN);
        if (adminAccount == null) {
            User admin = new User();
            admin.setEmail("admin@gmail.com");
            admin.setName("admin");
            admin.setRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepo.save(admin);
        }
    }

    @Override
    public StudentDto postStudent(StudentDto studentDto) {
        Optional<User> optionalUser = userRepo.findFirstByEmail(studentDto.getEmail());
        if (optionalUser.isEmpty()) {
            User user = new User();
            BeanUtils.copyProperties(studentDto, user);
            user.setPassword(new BCryptPasswordEncoder().encode(studentDto.getPassword()));
            user.setRole(UserRole.STUDENT);
            User createdUser = userRepo.save(user);
            StudentDto createdStudentDto = new StudentDto();
            createdStudentDto.setId(createdUser.getId());
            createdStudentDto.setEmail(createdUser.getEmail());
            return createdStudentDto;
        }
        return null;
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return userRepo.findAllByRole(UserRole.STUDENT).stream().map(User::getStudentDto).collect(Collectors.toList());
    }

    @Override
    public void deleteStudent(Long studentId) {
        userRepo.deleteById(studentId);
    }

    @Override
    public SingleStudentDto getStudentById(Long studentId) {
        Optional<User> optionalUser = userRepo.findById(studentId);
        if (optionalUser.isPresent()) {
            SingleStudentDto singleStudentDto = new SingleStudentDto();
            singleStudentDto.setStudentDto(optionalUser.get().getStudentDto());
            return singleStudentDto;
        }
        return null;
    }
}
