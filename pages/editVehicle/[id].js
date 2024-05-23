// pages/edit-vehicle/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../components/forms/styles.module.css';
import SidebarLayout from 'src/layouts/SidebarLayout';

function EditVehicle() {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch vehicle data by id
      fetch(`http://localhost:8081/api/vehicul/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch vehicle');
          }
          return response.json();
        })
        .then((data) => setVehicle(data))
        .catch((error) => console.error('Error fetching vehicle:', error));
    }
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  // Render the vehicle edit form with pre-filled data
  return (
    <div className={styles.formContainer}>
      <h1>Edit Vehicle</h1>
      <form>
        {/* Render form fields with vehicle data */}
        <div className={styles.formGroup}>
          <label>Matricule:</label>
          <input type="text" value={vehicle.matricule} />
        </div>
        <div className={styles.formGroup}>
          <label>Nom:</label>
          <input type="text" value={vehicle.nom} />
        </div>
        {/* Add more fields as necessary */}
        <button type="submit" className={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
}

EditVehicle.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default EditVehicle;
