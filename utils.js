export const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:5000'
		: 'https://nairobi-konnect-backend.onrender.com';