package pl.bednarz.airport.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "promo_tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origin;
    private String destination;
    private String date;
    private Integer price;

    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "img_url")
    private String imgUrl;
}