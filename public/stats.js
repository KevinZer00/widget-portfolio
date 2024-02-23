document.addEventListener('DOMContentLoaded', function () {
    // Browser Information
    document.getElementById('browser-info').textContent = navigator.userAgent;

    // Screen Resolution
    document.getElementById('screen-resolution').textContent = `${window.screen.width}x${window.screen.height}`;

    // Browser Language
    document.getElementById('browser-language').textContent = navigator.language;

    // Online Status
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline';
    document.getElementById('online-status').textContent = onlineStatus;

    // Viewport Size
    document.getElementById('viewport-size').textContent = `${window.innerWidth}x${window.innerHeight}`;
});


document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('networkChart').getContext('2d');
    const networkChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Response Time (ms)',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to update the chart with new data
    function updateChart(responseTime) {
        if (networkChart.data.labels.length > 20) {
            networkChart.data.labels.shift();
            networkChart.data.datasets[0].data.shift();
        }
        networkChart.data.labels.push(new Date().toLocaleTimeString());
        networkChart.data.datasets[0].data.push(responseTime);
        networkChart.update();
    }

    // Function to simulate fetching data and updating the chart
    function fetchData() {
        const startTime = performance.now();
        fetch('https://jsonplaceholder.typicode.com/todos/1') // Replace with your API endpoint
            .then(response => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                updateChart(responseTime);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Fetch data every 5 seconds
    setInterval(fetchData, 1000);
});
