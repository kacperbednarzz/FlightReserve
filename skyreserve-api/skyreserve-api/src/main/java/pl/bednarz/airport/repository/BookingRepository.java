package pl.bednarz.airport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.bednarz.airport.model.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


    @Query("SELECT DISTINCT b FROM Booking b " +
            "LEFT JOIN FETCH b.flight " +
            "LEFT JOIN FETCH b.user " +
            "LEFT JOIN FETCH b.passengers " +
            "WHERE b.user.id = :userId")
    List<Booking> findAllDetailsByUserId(@Param("userId") Long userId);

    List<Booking> findByUserId(Long userId);

    @Query("SELECT DISTINCT b FROM Booking b LEFT JOIN FETCH b.passengers LEFT JOIN FETCH b.flight")
    List<Booking> findAllWithDetails();
}