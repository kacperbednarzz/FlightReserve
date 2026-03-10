package pl.bednarz.airport.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscribers")
@Data
public class Newsletter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private LocalDateTime signupDate;

    public Newsletter() {
        this.signupDate = LocalDateTime.now();
    }
}