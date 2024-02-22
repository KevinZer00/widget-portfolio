let cpuChart;

function updateChartColor(chart, color) {
    if (chart && chart.data && chart.data.datasets) {
        chart.data.datasets.forEach(dataset => {
            dataset.borderColor = color;
        });
        chart.update();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');

    cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [{
                label: 'CPU Usage (%)',
                data: [], // CPU usage data will go here
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

    

    function updateSystemStatsCharts(data) {
        const now = new Date();
        const label = now.toLocaleTimeString();

        // Update CPU chart
        cpuChart.data.labels.push(label);
        cpuChart.data.datasets[0].data.push(parseFloat(data.cpuUsage));
        cpuChart.update();


        // Keep the charts from getting too crowded
        if (cpuChart.data.labels.length > 50) {
            cpuChart.data.labels.shift();
            cpuChart.data.datasets[0].data.shift();
        }
    }

  
    function fetchSystemStats() {
        fetch('/system-stats')
            .then(response => response.json())
            .then(data => {
                // Update system information text
                document.getElementById('platform-info').textContent = `Platform: ${data.platform}`;
                document.getElementById('cpu-count-info').textContent = `Number of CPUs: ${data.cpuCount}`;
                document.getElementById('free-memory-info').textContent = `Current Free Memory: ${data.freeMemory} GB`;
                document.getElementById('total-memory-info').textContent = `Total Memory: ${data.totalMemory} GB`;
                document.getElementById('uptime-info').textContent = `Process Up Time: ${Math.floor(data.systemUptime / 60)} minutes`;
    
                // Update the charts with the new data
                updateSystemStatsCharts({
                    cpuUsage: data.cpuUsage
                });
            })
            .catch(error => console.error('Error fetching system stats:', error));
    }

    // Update the stats and charts every 1 seconds
    setInterval(fetchSystemStats, 1000);

    // Initial fetch
    fetchSystemStats();
});




