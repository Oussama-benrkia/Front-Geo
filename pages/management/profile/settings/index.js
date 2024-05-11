import { useState, useEffect } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';

function ManagementUserSettings() {
  const [map, setMap] = useState(null); // State to store the map instance

  useEffect(() => {
    // Check if the DOM is available before initializing Leaflet
    if (document) {
      // Initialize map
      const mapInstance = L.map('map');

      // Add OSM tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      // Define virtual coordinates
      const virtualCoordinates = [
        [31.630000, -8.008889] // Initial position
      ];

      // Create marker
      const marker = L.marker(virtualCoordinates[0], {
        icon: L.icon({
          iconUrl: './car-svgrepo-com.svg',
          iconSize: [20, 20],
          iconAnchor: [20, 20],
          popupAnchor: [-3, -76],
          shadowSize: [20, 20],
          shadowAnchor: [20, 20],
        })
      }).addTo(mapInstance).bindTooltip('HELLO');

      // Center map to initial position
      mapInstance.setView(virtualCoordinates[0], 13);

      // Set the map instance to state
      setMap(mapInstance);

      // Update marker position
      const updateMarkerPosition = () => {
        setInterval(() => {
          // Generate random numbers for latitude and longitude
          const randomX = getRandomNumber(-0.001, 0.001);
          const randomY = getRandomNumber(-0.001, 0.001);

          // Update virtual coordinates
          virtualCoordinates[0][0] += randomX;
          virtualCoordinates[0][1] += randomY;

          // Update marker position
          marker.setLatLng(virtualCoordinates[0]);

          // Pan the map to the new position
          mapInstance.panTo(virtualCoordinates[0]);
        }, 1000); // Update position every 3 seconds
      };

      // Call the function to update marker position
      updateMarkerPosition();
    }
  }, []); // Run only once on component mount

  // Function to generate a random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Function to download JSON data as a file
  const downloadJSON = () => {
    // Code for downloading JSON data
  };

  return (
    <>
      <Head>
        {/* Include Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        {/* Include Leaflet JavaScript */}
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      </Head>
      <div id="map" style={{ height: '400px' }}></div>
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
