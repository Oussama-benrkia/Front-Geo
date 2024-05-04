import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
function ManagementUserProfile() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/users', {
      method: 'GET', // or POST, PUT, DELETE, etc.
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBZG1pbiJ9XSwic3ViIjoiQWRtaW5AQWRtaW4uY29tIiwiaWF0IjoxNzE0ODM4ODA1LCJleHAiOjE3MTU0NDM2MDV9.qVCvzwWIWYdZoD09Y59eVcvLz1_Cm_KitvrX5n3XvNY',
        'Content-Type': 'application/json', 
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setUsers(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
  
    });
  }, []);
  
  
  
  
  return (
    <>
      <div>
        <table className={styles.userstable}>
          <tr className={styles.tr1}>
            <th className={styles.th1}>ID</th>
            <th className={styles.th1}>Nom</th>
            <th className={styles.th1}>prenom</th>
            <th className={styles.th1}>Email</th>
          </tr>
          {users.map((user, i) => (
            <tr className={styles.tr1}>
              <td className={styles.th1}>{user.id}</td>
              <td className={styles.th1}>{user.first_name}</td>
              <td className={styles.th1}>{user.last_name}</td>
              <td className={styles.th1}>{user.email}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
