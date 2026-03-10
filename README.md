# ✈️ Airport Reservation System (Fullstack)

Nowoczesny system rezerwacji lotów zbudowany w architekturze klient-serwer. Projekt skupia się na logice backendowej, zarządzaniu relacyjną bazą danych oraz responsywnym interfejsie użytkownika.

## 🚀 Główne Funkcjonalności
* **Wyszukiwarka lotów:** Dynamiczne filtrowanie połączeń na podstawie bazy PostgreSQL.
* **System Rezerwacji:** Formularz rezerwacji dla wielu pasażerów z walidacją dokumentów (Regex).
* **Newsletter:** Moduł zapisu pasażerów do bazy mailingowej (Backend Integration).
* **Explore:** Zarządzanie własnymi rezerwacjami (widok dla zalogowanego użytkownika).
* **UI/UX:** Interfejs typu "Dark Mode"

## 🛠️ Technologie
### Backend
* **Java 17+** & **Spring Boot 3**
* **Spring Data JPA** (Hibernate)
* **PostgreSQL** (Relacyjna baza danych)
* **REST API** (Komunikacja JSON)

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Stylizacja)
* **Lucide React** (Ikony)
* **Framer Motion** (Animacje)

## 🔧 Jak uruchomić?
1. **Backend:** Skonfiguruj bazę PostgreSQL w `application.properties` i uruchom `mvn spring-boot:run`.
2. **Frontend:** W folderze `/skyreserve-frontend` wykonaj `npm install`, a następnie `npm run dev`.

---
*Projekt stworzony w celach edukacyjnych.*