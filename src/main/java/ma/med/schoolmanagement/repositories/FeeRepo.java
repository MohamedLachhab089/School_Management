package ma.med.schoolmanagement.repositories;

import ma.med.schoolmanagement.entities.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeeRepo extends JpaRepository<Fee, Long> {

}
