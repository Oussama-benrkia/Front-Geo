// components/EditVehicle.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditVehicle = ({ id }) => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/vehicule/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicle(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const handleSave = async () => {
    // Implement save functionality here
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vehicle details</div>;
  }

  return (
    <div>
      <h1>Edit Vehicle</h1>
      <form>
        <div>
          <label>Matricule:</label>
          <input
            type="text"
            value={vehicle.matricule}
            onChange={(e) => setVehicle({ ...vehicle, matricule: e.target.value })}
          />
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={vehicle.nom}
            onChange={(e) => setVehicle({ ...vehicle, nom: e.target.value })}
          />
        </div>
        {/* Add more fields as needed */}
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditVehicle;
