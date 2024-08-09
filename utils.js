export const SERVER_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: 'https://task-managment-backend-ogdc.onrender.com';