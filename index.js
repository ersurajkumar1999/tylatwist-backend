import http from 'http';
import { PORT } from './config/index.js';
import app from './utils/app.js';
import connectToDB from './utils/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
// Connect to the database
connectToDB();


// Create the server
const server = http.createServer(app);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// Optional: Handle server errors
server.on('error', (error) => {
    console.error('Error starting the server:', error);
});