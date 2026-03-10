package pl.bednarz.airport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bednarz.airport.model.Booking;
import pl.bednarz.airport.model.Passenger;
import pl.bednarz.airport.service.BookingService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getMyBookings(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    /**
     * TWORZENIE REZERWACJI
     */
    @PostMapping
    @SuppressWarnings("unchecked")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("DEBUG: Odebrano payload rezerwacji: " + payload);

            // 1. Walidacja podstawowych ID
            if (payload.get("userId") == null || payload.get("flightId") == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Błąd: Brak userId lub flightId w żądaniu"));
            }

            Long userId = Long.valueOf(payload.get("userId").toString());
            Long flightId = Long.valueOf(payload.get("flightId").toString());

            // 2. Parsowanie listy pasażerów
            List<Map<String, String>> passengersData = (List<Map<String, String>>) payload.get("passengers");
            if (passengersData == null || passengersData.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Błąd: Lista pasażerów nie może być pusta"));
            }

            List<Passenger> passengers = passengersData.stream().map(data -> {
                Passenger p = new Passenger();
                p.setFirstName(data.get("firstName"));
                p.setLastName(data.get("lastName"));
                p.setEmail(data.get("email"));
                p.setPassportNumber(data.get("passportNumber"));
                return p;
            }).collect(Collectors.toList());

            // 3. Zapis do bazy
            Booking saved = bookingService.createBookingWithPassengers(userId, flightId, passengers);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            System.err.println("CRITICAL ERROR w createBooking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Błąd serwera: " + e.getMessage()));
        }
    }

    /**
     * USUWANIE REZERWACJI
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            System.out.println("DEBUG: Próba usunięcia rezerwacji o ID: " + id);
            bookingService.deleteBooking(id);
            return ResponseEntity.ok(Map.of("message", "Mission aborted. Booking deleted successfully."));
        } catch (RuntimeException e) {
            System.err.println("DELETE ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Nie znaleziono rezerwacji: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Błąd podczas usuwania: " + e.getMessage()));
        }
    }
}