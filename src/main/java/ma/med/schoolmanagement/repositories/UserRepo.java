package ma.med.schoolmanagement.repositories;

import ma.med.schoolmanagement.dtos.StudentDto;
import ma.med.schoolmanagement.entities.User;
import ma.med.schoolmanagement.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    User findByRole(UserRole userRole);

    //Optional<User> findByEmail(String email);

    Optional<User> findFirstByEmail(String email);

    List<User> findAllByRole(UserRole userRole);
}
