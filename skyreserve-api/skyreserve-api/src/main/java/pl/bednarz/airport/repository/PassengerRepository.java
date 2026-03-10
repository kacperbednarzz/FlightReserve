package pl.bednarz.airport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bednarz.airport.model.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
}
