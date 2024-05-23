import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import styles from './styles.module.css';
function AddVehicle() {
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [modele, setModele] = useState('');
  const [etat, setEtat] = useState('actif');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
      return token;
    };
    let a=checkAuthentication()
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('matricule', matricule);
    formData.append('nom', nom);
    formData.append('modele', modele);
    formData.append('etat', etat);
    formData.append('status', status);
    formData.append('type', type);
    if (image) {
      formData.append('image', image);
    }
    
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
      return token;
    };
    const token=checkAuthentication()
    try {
      const response = await fetch('http://localhost:8081/api/vehicule', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      console.log('Vehicle added successfully');
      router.push('/'); // Navigate back to the main page or vehicle list
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Add New Vehicle</h1>
      <form onSubmit={handleSubmit}className={styles.form}>
        <div className={styles.formGroup}>
          <label>Matricule:</label>
          <input             className={styles.input}
 type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Nom:</label>
          <input             className={styles.input}
 type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Modele:</label>
          <input             className={styles.input}
 type="text" value={modele} onChange={(e) => setModele(e.target.value)} required />
        </div>
        
        <div className={styles.formGroup}>
          <label>Etat:</label>
          <select             className={styles.input}
 value={etat} onChange={(e) => setEtat(e.target.value)}>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
            <div className={styles.formGroup}>
          <label>Status:</label>
          <input             className={styles.input}
 type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Type:</label>
          <input             className={styles.input}
 type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Image:</label>
          <input             className={styles.input}
 type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" className={styles.submitButton}>Add Vehicle</button>
      </form>
    </div>
  );
}
AddVehicle.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default AddVehicle;