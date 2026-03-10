package pl.bednarz.airport.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // rezerwujący bilet
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // id lotu które rezerwuje klient
    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    // kolumna passenger_id
    @Column(name = "passenger_id")
    private Long passengerId;

    // lista pasażerów
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Passenger> passengers = new ArrayList<>();

    private Integer totalPrice;

    private LocalDateTime bookingDate = LocalDateTime.now();

    // Metoda pomocnicza do dodawania pasażerów
    public void addPassenger(Passenger passenger) {
        passengers.add(passenger);
        passenger.setBooking(this);
    }
}