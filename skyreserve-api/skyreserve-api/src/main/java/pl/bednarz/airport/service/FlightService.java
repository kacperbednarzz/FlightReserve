package pl.bednarz.airport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.bednarz.airport.model.Flight;
import pl.bednarz.airport.repository.FlightRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    private final Random random = new Random();

    private final String[] cities = {
            "Warszawa", "Kraków", "Katowice", "Chicago",
            "Los Angeles", "Dubai", "New York", "Madryt"
    };

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<Flight> getUpcomingFlights() {
        return flightRepository.findAll().stream()
                .filter(f -> f.getDepartureTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());
    }

    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public String generateYearlyFlights() {
        int count = 0;
        for (int day = 0; day < 60; day++) {
            LocalDateTime baseDate = LocalDateTime.now().plusDays(day).withHour(0).withMinute(0);

            for (String from : cities) {
                for (String to : cities) {
                    if (!from.equals(to)) {
                        saveGeneratedFlight(from, to, baseDate.withHour(7 + random.nextInt(4)));
                        saveGeneratedFlight(from, to, baseDate.withHour(17 + random.nextInt(5)));
                        count += 2;
                    }
                }
            }
        }
        return "Pomyślnie wygenerowano " + count + " lotów!";
    }

    private void saveGeneratedFlight(String from, String to, LocalDateTime depTime) {
        Flight f = new Flight();
        f.setFlightNumber("SG-" + (random.nextInt(9000) + 1000));
        f.setDepartureCity(from);
        f.setArrivalCity(to);
        f.setDepartureTime(depTime);

        boolean isLongHaul = isIntercontinental(from, to);
        int duration = isLongHaul ? 8 + random.nextInt(5) : 1 + random.nextInt(3);
        f.setArrivalTime(depTime.plusHours(duration));

        int price = isLongHaul ? 1200 + random.nextInt(3000) : 150 + random.nextInt(600);
        f.setTicketPrice(price);

        flightRepository.save(f);
    }

    private boolean isIntercontinental(String from, String to) {
        String longRoutes = ".*(Chicago|Los Angeles|Dubai|New York).*";
        return from.matches(longRoutes) || to.matches(longRoutes);
    }

    public Flight createTestFlight() {
        Flight f = new Flight();
        f.setFlightNumber("BED-" + (random.nextInt(900) + 100));
        f.setDepartureCity("Kraków");
        f.setArrivalCity("London");
        f.setDepartureTime(LocalDateTime.now().plusDays(2));
        f.setArrivalTime(LocalDateTime.now().plusDays(2).plusHours(2));
        f.setTicketPrice(299);
        return flightRepository.save(f);
    }
}