import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

function Forms() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async() =>{
      const token = localStorage.getItem("token");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
    try{
    const response = await fetch('http://localhost:8081/api/vehicule', {
      method: 'GET',// or POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBZG1pbiJ9XSwic3ViIjoiQWRtaW5AQWRtaW4uY29tIiwiaWF0IjoxNzE2MTE5MTAwLCJleHAiOjE3MTY3MjM5MDB9.B2yEvK17qVKGd37fq4ZTKFD1yIKmjP7GClSLNp9dHZw`,
        'Content-Type': 'application/json', 
      }
    });
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    setVehicles(data);
    setLoading(false);
} catch(error){
  setError(error);
  setLoading(false);
}

};
    fetchData();  
}, []);
if(loading){
  return <div>Loading...</div>;
} 
if (error) {
  return <div>Error loading vehicles</div>;
}
return (
  <>
    <div>
      <table className={styles.userstable}>
        <thead>
          <tr className={styles.tr1}>
            <th className={styles.th1}>ID</th>
            <th className={styles.th1}>Matricule</th>
            <th className={styles.th1}>Nom</th>
            <th className={styles.th1}>Modele</th>
            <th className={styles.th1}>Etat</th>
            <th className={styles.th1}>Status</th>
            <th className={styles.th1}>Type</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, i) => {
            let etatDisplay;
            let etatColor;
            if (vehicle.etat === true) {
              etatDisplay = "actif";
              etatColor = "green";
            } else if (vehicle.etat === false) {
              etatDisplay = "inactif";
              etatColor = "red";
            }
            console.log(`Vehicle ID: ${vehicle.id}, Etat: ${vehicle.etat}, Display: ${etatDisplay}`);
            return (
              <tr className={styles.tr1} key={i}>
                <td className={styles.th1}>{vehicle.id}</td>
                <td className={styles.th1}>{vehicle.matricule}</td>
                <td className={styles.th1}>{vehicle.nom}</td>
                <td className={styles.th1}>{vehicle.modele}</td>
                <td className={styles.th1} style={{ color: etatColor }}>{etatDisplay}</td>
                <td className={styles.th1}>{vehicle.status}</td>
                <td className={styles.th1}>{vehicle.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

}

Forms.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
