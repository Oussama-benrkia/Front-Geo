import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useRouter } from 'next/router';
import styles from './styles/localisation.module.css';

const Leaflet = dynamic(() => import('leaflet'), { ssr: false });

function ManagementUserSettings() {
  const [map, setMap] = useState(null);
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);

  // Define virtualCoordinates, marker, and getRandomNumber function
  let virtualCoordinates = [[31.630000, -8.008889]];
  let marker;
  let getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Define updateMarkerPosition function
  let updateMarkerPosition = () => {
    if (map) {
      // Generate random numbers for latitude and longitude
      const randomX = getRandomNumber(-0.001, 0.001);
      const randomY = getRandomNumber(-0.001, 0.001);

      // Update virtual coordinates
      virtualCoordinates[0][0] += randomX;
      virtualCoordinates[0][1] += randomY;

      // Update marker position
      marker.setLatLng(virtualCoordinates[0]);

      // Pan the map to the new position
      map.panTo(virtualCoordinates[0]);
    }
  };

  useEffect(() => {
    let intervalId; // Variable to store the interval ID
    let mapInstance; // Variable to store the map instance

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
        import('leaflet').then(L => {
          // Check if the map is already initialized
          if (!mapInstance) {
            // Initialize map
            mapInstance = L.map('map');

            // Add OSM tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);

            // Set initial view
            mapInstance.setView([51.505, -0.09], 13);

            // Create marker
            const marker = L.marker([51.505, -0.09]).addTo(mapInstance);

            // Set interval to update marker position
            // intervalId = setInterval(() => {
            //     // Update marker position
            //     const lat = 51.505 + (Math.random() - 0.5) * 0.1;
            //     const lng = -0.09 + (Math.random() - 0.5) * 0.1;
            //     marker.setLatLng([lat, lng]);

            //     // Pan the map to the new position
            //     mapInstance.panTo([lat, lng]);
            // }, 1000); // Update position every second
          }
        });

        fetch('http://localhost:8081/api/vehicule', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(data => setVehicles(data));
      }
    }

    // Cleanup function to clear interval and remove map instance
    return () => {
      clearInterval(intervalId);
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    };
  }, [router]);

  // Rest of your component code...

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Head>
      <div style={{ display: 'flex' }}>
        <div className={styles['sidebar-2']}>
          <h2 className={styles['sidebar-h2']}>Vehicles</h2>
          <div className={styles['sidebar']}>
          <ul className={styles['sidebar-ul']}>
            {vehicles.map((vehicle, index) => (
              <li key={index} className={styles['sidebar-ul-li']}>{vehicle.matricule} - {vehicle.modele}</li>
            ))}
          </ul>
        </div>
        </div>
        <div id="map" style={{ height: '85vh', width: '250vh' }}></div>
      </div>

    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
