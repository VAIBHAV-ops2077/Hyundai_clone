// Default map center (India)
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Try to get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    map.setView([userLat, userLng], 13);

    // Add user marker
    L.marker([userLat, userLng])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    // Static showroom markers (add manually or from CSV/API)
    const showrooms = [
      { name: "Hyundai Showroom A", lat: userLat + 0.01, lng: userLng + 0.01 },
      { name: "Hyundai Showroom B", lat: userLat - 0.01, lng: userLng - 0.01 }
    ];

    showrooms.forEach(showroom => {
      L.marker([showroom.lat, showroom.lng])
        .addTo(map)
        .bindPopup(`<b>${showroom.name}</b>`);
    });
  }, () => {
    alert("Geolocation permission denied. Map showing default location.");
  });
}
