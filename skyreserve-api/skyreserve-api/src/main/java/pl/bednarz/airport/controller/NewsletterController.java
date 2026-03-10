package pl.bednarz.airport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bednarz.airport.model.Newsletter;
import pl.bednarz.airport.repository.NewsletterRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "http://localhost:5173")
public class NewsletterController {

    @Autowired
    private NewsletterRepository newsletterRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid email format"));
        }

        if (newsletterRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.ok(Map.of("message", "Already subscribed!"));
        }

        Newsletter newSubscriber = new Newsletter();
        newSubscriber.setEmail(email);
        newsletterRepository.save(newSubscriber);

        return ResponseEntity.ok(Map.of("message", "Subscribed successfully!"));
    }
}