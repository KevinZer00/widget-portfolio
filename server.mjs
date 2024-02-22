import express from 'express';
import fetch from 'node-fetch';


const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const { latitude, longitude } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY; // Use environment variable in production
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




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
