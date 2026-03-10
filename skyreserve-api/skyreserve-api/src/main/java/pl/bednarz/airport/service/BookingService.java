package pl.bednarz.airport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.bednarz.airport.model.Booking;
import pl.bednarz.airport.model.Flight;
import pl.bednarz.airport.model.Passenger;
import pl.bednarz.airport.model.User;
import pl.bednarz.airport.repository.BookingRepository;
import pl.bednarz.airport.repository.FlightRepository;
import pl.bednarz.airport.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    // Pobieranie rezerwacji dla uzytkowanika
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findAllDetailsByUserId(userId);
    }

    // Tworzy rezerwacje i łączy z listą pasażerów
    @Transactional
    public Booking createBookingWithPassengers(Long userId, Long flightId, List<Passenger> passengers) {
        // 1. Pobranie encji z bazy
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje: " + userId));

        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Lot nie istnieje: " + flightId));

        // 2. Inicjalizacja nowej rezerwacji
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setBookingDate(LocalDateTime.now());

        // 3. Obliczanie ceny całkowitej
        if (flight.getTicketPrice() != null && passengers != null) {
            booking.setTotalPrice(flight.getTicketPrice() * passengers.size());
        }

        // 4. Łączenie pasażerów z rezerwacją
        if (passengers != null) {
            for (Passenger passenger : passengers) {
                booking.addPassenger(passenger);
            }
        }

        // 5. PIERWSZY ZAPIS - Hibernate zapisuje Booking i wszystkich Passengerów (generując im ID)
        Booking savedBooking = bookingRepository.save(booking);

        // 6. PRZYPISANIE GENEROWANEGO ID PASAŻERA DO KOLUMNY passenger_id W BOOKINGS
        if (savedBooking.getPassengers() != null && !savedBooking.getPassengers().isEmpty()) {
            // Pobieramy ID pierwszego pasażera z listy tych już zapisanych w bazie
            Long generatedPassengerId = savedBooking.getPassengers().get(0).getId();
            savedBooking.setPassengerId(generatedPassengerId);

            // Ponowny zapis (update), żeby uzupełnić brakującą kolumnę passenger_id
            return bookingRepository.save(savedBooking);
        }

        return savedBooking;
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Nie znaleziono rezerwacji o ID: " + id);
        }
        bookingRepository.deleteById(id);
    }
}