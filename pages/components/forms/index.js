"use client";
import { useRouter } from 'next/router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

function Forms() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
 
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
      return token;
    };
    const token=checkAuthentication()
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/vehicule', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading vehicles</div>;
  }

  const handleAddNewVehicle = () => {
    router.push('/add-vehicle');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmed) {
      return;
    }

    try {
      const usertoken = localStorage.getItem("token");
      if (usertoken) {
        router.push("/login");
      }
      const response = await fetch(`http://localhost:8081/api/vehicule/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${usertoken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Failed to delete vehicle: Forbidden (403)');
        }
        throw new Error('Failed to delete vehicle');
      }

      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError(error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={handleAddNewVehicle}>Add New Vehicle</button>
      <table className={styles.userstable}>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Modele</th>
            <th>Etat</th>
            <th>Status</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, i) => {
            const etatDisplay = vehicle.etat ? "actif" : "inactif";
            const etatColor = vehicle.etat ? "green" : "red";
            return (
              <tr key={i}>
                <td>{vehicle.matricule}</td>
                <td>{vehicle.nom}</td>
                <td>{vehicle.modele}</td>
                <td style={{ color: etatColor }}>{etatDisplay}</td>
                <td>{vehicle.status}</td>
                <td>{vehicle.type}</td>
                <td>
                  <Link href={`/edit-vehicle/${vehicle.id}`}>
                    <button className={styles.modifyButton}>Modify</button>
                  </Link>
                  <button className={styles.deleteButton} onClick={() => handleDelete(vehicle.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Forms.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
