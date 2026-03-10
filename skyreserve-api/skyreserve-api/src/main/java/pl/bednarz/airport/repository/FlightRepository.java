package pl.bednarz.airport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bednarz.airport.model.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

}
