function updateClock() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[now.getDay()];
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const date = now.getDate();
    const year = now.getFullYear();

    // Format the date string
    const dateString = `${day} ${month}-${date}-${year}`;

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24hr clock to 12hr clock
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad the minutes and seconds with leading zeros
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Update the date and time elements
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    
    if(dateElement && timeElement) {
        dateElement.textContent = dateString;
        timeElement.textContent = timeString;
    }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock
updateClock();
