import { app } from '../dist/weather-forecast/server/server.mjs'; // Adjust the path as needed
    
    export default async (req, res) => {
      try {
        app(req, res);
      } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
      }
    };