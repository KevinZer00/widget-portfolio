import express from 'express';
import fetch from 'node-fetch';
import os from 'os';
import osUtils from 'os-utils';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const { latitude, longitude } = req.query;
    const apiKey = '6363b6a8c9c71debdd4ee07d34caaaf1'; // Use environment variable in production
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); // Send the complete weather data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

app.get('/system-stats', (req, res) => {
    osUtils.cpuUsage(function(cpuPercentage) {
        const stats = {
            platform: os.platform(),
            cpuCount: os.cpus().length,
            cpuUsage: (cpuPercentage * 100).toFixed(2),
            freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2), // Convert from bytes to GB
            totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), // Convert from bytes to GB
            systemUptime: os.uptime() // Uptime in seconds
        };
        res.json(stats);
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
