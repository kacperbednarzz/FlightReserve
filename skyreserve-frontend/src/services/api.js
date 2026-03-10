const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        const error = errorText ? JSON.parse(errorText) : {};
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const apiService = {
    // LOTY
    flights: {
        getAll: () => fetch(`${BASE_URL}/flights`).then(handleResponse),
        getUpcoming: () => fetch(`${BASE_URL}/flights/upcoming`).then(handleResponse),
    },

    // PROMOCJE
    promoTickets: {
        getAll: () => fetch(`${BASE_URL}/promo-tickets`).then(handleResponse),
    },

    // REZERWACJE
    bookings: {
        create: (bookingData) => fetch(`${BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        }).then(handleResponse),

        getUserBookings: (userId) => fetch(`${BASE_URL}/bookings/user/${userId}`).then(handleResponse),
        
        delete: (id) => fetch(`${BASE_URL}/bookings/${id}`, { 
            method: 'DELETE' 
        }).then(handleResponse),
    },

    // UŻYTKOWNICY
    users: {
        login: (credentials) => fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(handleResponse),

        register: (userData) => fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(handleResponse),
    }
};