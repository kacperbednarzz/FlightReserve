package pl.bednarz.airport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.bednarz.airport.model.Flight;
import pl.bednarz.airport.service.FlightService;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // 1. Pobieranie wszystkich lotów
    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    // 2. Pobieranie tylko przyszłych lotów
    @GetMapping("/upcoming")
    public List<Flight> getUpcomingFlights() {
        return flightService.getUpcomingFlights();
    }


    // 3. Dodawanie lotu ręcznie
    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightService.saveFlight(flight);
    }
}