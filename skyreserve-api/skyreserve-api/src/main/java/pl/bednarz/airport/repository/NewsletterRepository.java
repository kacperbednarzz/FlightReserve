package pl.bednarz.airport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bednarz.airport.model.Newsletter;
import java.util.Optional;

public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
    Optional<Newsletter> findByEmail(String email);
}