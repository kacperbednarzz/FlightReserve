package pl.bednarz.airport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bednarz.airport.model.PromoTicket;

@Repository
public interface PromoTicketRepository extends JpaRepository<PromoTicket, Long> {
}