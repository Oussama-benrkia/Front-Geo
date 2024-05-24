import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useRouter } from 'next/router';

// Dynamically import Leaflet with SSR disabled
const Leaflet = dynamic(() => import('leaflet'), { ssr: false });

function ManagementUserSettings() {
  const [map, setMap] = useState(null); // State to store the map instance
  const router = useRouter();
  let marker;

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
        }
        return token;
      };

      const token = checkAuthentication();
      if (token) {
        // Dynamically import Leaflet
        import('leaflet').then(L => {
          // Check if map is already initialized
          if (!map) {
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

            // Example vehicle data
            const vehicles = [
              {
                id: 1,
                matricule: "DD012DD",
                name: "Chevrolet",
                model: "Corolla",
                status: "Active",
                coordinates: [31.630000, -8.008889]
              },
              {
                id: 2,
                matricule: "EE345EE",
                name: "Tesla",
                model: "208",
                status: "Inactive",
                coordinates: [31.631000, -8.009889]
              },
              {
                id: 7,
                matricule: "DD012DD",
                name: "Chevrolet",
                model: "Corolla",
                status: "Active",
                coordinates: [31.631000, -8.009888]
              }
              // Add more vehicles as needed
            ];

            // Create markers for each vehicle
            vehicles.forEach(vehicle => {
              const { matricule, name, model, status, coordinates } = vehicle; // Destructure vehicle object
              const coordString = coordinates.join(', ');
              L.marker(coordinates, {
                icon: L.icon({
                  iconUrl: './car.svg',
                  iconSize: [20, 20],
                  iconAnchor: [10, 20],
                  popupAnchor: [-3, -76],
                  shadowSize: [20, 20],
                  shadowAnchor: [10, 20],
                })
              }).addTo(mapInstance).bindTooltip(`
                <div>
                  <strong>${matricule}</strong><br />
                  Name: ${name}<br />
                  Model: ${model}<br />
                  Status: ${status}<br />
                  Coordinates: ${coordString}
                </div>
              `);
            });

            // Center map to initial position
            mapInstance.setView([31.630000, -8.008889], 13);

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
                if (marker) {
                  marker.setLatLng(virtualCoordinates[0]);
                  // Pan the map to the new position
                  mapInstance.panTo(virtualCoordinates[0]);
                }
              }, 1000); // Update position every second
            };

            // Call the function to update marker position
            updateMarkerPosition();
          }
        });
      }
    }
  }, [router, map]); // Run only once on component mount

  // Function to generate a random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <>
      <Head>
        {/* Include Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Head>
      <div id="map" style={{ height: '85vh' }}></div>
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
