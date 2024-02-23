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


let networkChart;

function updateChartColor(chart, color) {
    if (chart && chart.data && chart.data.datasets) {
        chart.data.datasets.forEach(dataset => {
            dataset.borderColor = color;
        });
        chart.update();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const networkCtx = document.getElementById('networkChart').getContext('2d');

    networkChart = new Chart(networkCtx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [{
                label: 'Network Response Time (ms)',
                data: [],
                fill: false,
                borderColor: 'rgb(0, 255, 0)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    display: false
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateNetworkStats(responseTime) {
        const now = new Date();
        const label = now.toLocaleTimeString();

        // Update Network chart
        networkChart.data.labels.push(label);
        networkChart.data.datasets[0].data.push(responseTime);
        networkChart.update();

        // Keep the chart from getting too crowded
        if (networkChart.data.labels.length > 20) {
            networkChart.data.labels.shift();
            networkChart.data.datasets[0].data.shift();
        }
    }

    function fetchNetworkStats() {
        const startTime = performance.now();
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                updateNetworkStats(responseTime);
            })
            .catch(error => console.error('Error fetching network stats:', error));
    }

    // Update the stats every 1 second
    setInterval(fetchNetworkStats, 1000);

    // Initial fetch
    fetchNetworkStats();
});

