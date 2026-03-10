package pl.bednarz.airport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.bednarz.airport.model.PromoTicket;
import pl.bednarz.airport.repository.PromoTicketRepository;

import java.util.List;

@RestController
@RequestMapping("/api/promo-tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class PromoTicketController {

    @Autowired
    private PromoTicketRepository promoTicketRepository;

    @GetMapping
    public List<PromoTicket> getAllPromo() {
        return promoTicketRepository.findAll();
    }
}