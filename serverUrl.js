import axios from 'axios'

// Create an instance with a base URL
const instance = axios.create({
  baseURL: 'https://ecommerce-django-69d36e32f187.herokuapp.com/api/', // Replace with your base URL
  timeout: 5000, // Optional: Set timeout
  headers: {
    'Content-Type': 'application/json', // Optional: Set default headers
    // Add any other default headers if needed
  }
});

export default instance;