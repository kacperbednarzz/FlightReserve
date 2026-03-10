import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlightSearch from './components/FlightSearch';
import Steps from './components/Steps';
import PromoList from './components/PromoList';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import MyTrips from './components/MyTrips';
import SearchResultsModal from './components/SearchResultsModal';
import BookingModal from './components/BookingModal';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showMyTrips, setShowMyTrips] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); 

  const [allFlights, setAllFlights] = useState([]); 
  const [filteredFlights, setFilteredFlights] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const data = await apiService.flights.getAll();
        setAllFlights(data || []);
      } catch (error) {
        console.error("Błąd pobierania lotów:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const handleSearch = (searchData) => {
    const { from, to, startDate } = searchData;
    setSearchParams(searchData);

    const filtered = allFlights.filter(flight => {
      const flightDep = (flight.departureCity || flight.departure_city || "").toLowerCase().trim();
      const flightArr = (flight.arrivalCity || flight.arrival_city || "").toLowerCase().trim();
      const flightDateRaw = flight.departureTime || flight.departure_time;

      const matchFrom = from ? flightDep === from.toLowerCase().trim() : true;
      const matchTo = to ? flightArr === to.toLowerCase().trim() : true;
      
      const fDate = new Date(flightDateRaw).toLocaleDateString('sv-SE');
      const sDate = startDate ? new Date(startDate).toLocaleDateString('sv-SE') : null;
      const matchDate = sDate ? fDate === sDate : true;

      return matchFrom && matchTo && matchDate;
    });

    setFilteredFlights(filtered);
    setIsResultsOpen(true);
  };

  const handleSelectFlight = (flight) => {
    const isLogged = localStorage.getItem('userName');
    if (!isLogged) {
      setIsResultsOpen(false);
      setIsAuthOpen(true);
      return;
    }
    setIsResultsOpen(false);
    setSelectedFlight(flight);
    setIsBookingOpen(true);
  };

  const handleSelectPromo = (promo) => {
    const isLogged = localStorage.getItem('userName');
    if (!isLogged) {
      setIsAuthOpen(true);
      return;
    }

    console.log("Kliknięta promocja (pełny obiekt):", promo);

    const mappedFlight = {
      id: promo.flight_id || promo.flightId || promo.id,
      departureCity: promo.origin || promo.departureCity,
      arrivalCity: promo.destination || promo.arrivalCity,
      departureTime: promo.date || promo.departureTime,
      ticketPrice: promo.price || promo.ticketPrice
    };
    
    console.log("Wybrane ID do rezerwacji:", mappedFlight.id);
    
    setSelectedFlight(mappedFlight);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = async (passengersFromModal) => {
    const loggedUserId = localStorage.getItem('userId');
    const loggedUserEmail = localStorage.getItem('userEmail') || 'kacper@loty.pl';

    if (!loggedUserId) {
      alert("Session expired. Please sign in again.");
      setIsAuthOpen(true);
      throw new Error("No user ID found");
    }

    const hasEmptyFields = passengersFromModal.some(p => 
      !p.firstName?.trim() || !p.lastName?.trim() || !p.passportNumber?.trim()
    );

    if (hasEmptyFields) {
      alert("Please complete all passenger details.");
      throw new Error("Empty fields");
    }

    const passportRegex = /^ID\d{8}$/;
    const invalidPassport = passengersFromModal.find(p => !passportRegex.test(p.passportNumber));

    if (invalidPassport) {
      alert("Invalid Passport format! ID + 8 digits.");
      throw new Error("Invalid passport");
    }

    try {
      const payload = {
        userId: parseInt(loggedUserId),
        flightId: selectedFlight.id, 
        passengers: passengersFromModal.map(p => ({
          firstName: p.firstName,
          lastName: p.lastName,
          email: p.email || loggedUserEmail,
          passportNumber: p.passportNumber.toUpperCase()
        }))
      };

      console.log("Wysyłam rezerwację:", payload);

      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        setStatusMessage("RESERVATION CONFIRMED!"); 
        setTimeout(() => setStatusMessage(""), 6000);
        return result; 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Błąd zapisu");
      }
    } catch (err) {
      console.error("Błąd rezerwacji:", err);
      throw err; 
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
      <Navbar 
        onSignInClick={() => setIsAuthOpen(true)} 
        onMyTripsClick={() => { setShowMyTrips(true); setStatusMessage(""); }}
        onLogoClick={() => { setShowMyTrips(false); setStatusMessage(""); }}
      />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <SearchResultsModal 
        isOpen={isResultsOpen} 
        onClose={() => setIsResultsOpen(false)} 
        flights={filteredFlights}
        onSelectFlight={handleSelectFlight}
        searchParams={searchParams}
      />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        flight={selectedFlight}
        onConfirm={handleConfirmBooking}
        searchParams={searchParams}
      />

      <main className="max-w-7xl mx-auto px-6">
        {statusMessage && !showMyTrips && (
          <div className="mt-10 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center gap-3 animate-pulse transition-all">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              {statusMessage}
            </span>
          </div>
        )}

        {showMyTrips ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MyTrips />
          </div>
        ) : (
          <div className="animate-in fade-in duration-1000">
            <div className="relative">
              <Hero />
              <FlightSearch onSearch={handleSearch} availableFlights={allFlights} />
            </div>
            <div className="mt-40"><Steps /></div>
            <div id="promo-section" className="mt-40">
              <PromoList onSelectFlight={handleSelectPromo} loading={loading} />
            </div>
            <div className="mt-40"><Newsletter /></div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;