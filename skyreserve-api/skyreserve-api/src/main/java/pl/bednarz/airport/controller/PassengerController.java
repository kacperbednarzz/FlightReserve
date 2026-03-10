package pl.bednarz.airport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.bednarz.airport.model.Passenger;
import pl.bednarz.airport.service.PassengerService;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
// Dodajemy CrossOrigin, aby React mógł swobodnie komunikować się z tym endpointem
@CrossOrigin(origins = "http://localhost:5173")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @GetMapping
    public List<Passenger> getAllPassengers() {
        return passengerService.getAllPassengers();
    }

    @PostMapping
    public Passenger addPassenger(@RequestBody Passenger passenger) {
        return passengerService.savePassenger(passenger);
    }
}