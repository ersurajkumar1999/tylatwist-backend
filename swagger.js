import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from './config/index.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title', // Title of your API
            version: '1.0.0', // Version of your API
            description: 'API documentation', // Short description of your API
            contact: {
                email: "spandev23@gmail.com"
            },
            "version": "1.0"
        },
        "tags": [
            {
                "name": "Authentication",
                "description": "Authentication Managment"
            },
            {
                "name": "User",
                "description": "User Management"
            }
        ],
        "components": {
            "securitySchemes": {
                "passport": {
                    "type": "oauth2",
                    "description": "Laravel passport oauth2 security.",
                    "in": "header",
                    "scheme": "https",
                    "flows": {
                        "password": {
                            // "authorizationUrl": `http://localhost:${PORT}/oauth/authorize`,
                            "tokenUrl": `http://localhost:${PORT}/oauth/token`,
                            "refreshUrl": `http://localhost:${PORT}/token/refresh`,
                            "scopes": []
                        }
                    }
                }
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // The base URL of your API
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs (this will point to your route files)
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
