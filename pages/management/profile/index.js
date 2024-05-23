"use client"
import { useRouter } from 'next/router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
function ManagementUserProfile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
  useEffect(() => {
    const fetchData = async() =>{
      const token = localStorage.getItem("token");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
    try{
    const response = await fetch('http://localhost:8081/api/users', {
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
    setUsers(data);
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
  return <div>Error loading users</div>;
}
const handleAddNewUser = () => {
  console.log("Add new user");
  router.push('/add-user');
  // Implement add new vehicle functionality here
};
return (
  <div className={styles.container}>
<button className={styles.addButton} onClick={handleAddNewUser}>Add New User</button>
    <table className={styles.userstable}>
      <thead>
        <tr className={styles.tr1}>
          <th className={styles.th1}>ID</th>
          <th className={styles.th1}>Nom</th>
          <th className={styles.th1}>Prenom</th>
          <th className={styles.th1}>Email</th>
          <th className={styles.th1}>Role</th>
          <th className={styles.th1}>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className={styles.tr1}>
            <td className={styles.th1}>{user.id}</td>
            <td className={styles.th1}>{user.first_name}</td>
            <td className={styles.th1}>{user.last_name}</td>
            <td className={styles.th1}>{user.email}</td>
            <td className={styles.th1}>{user.role}</td>
            <td className={styles.th1}>
<button className={styles.modifyButton} onClick={() => handleModify(vehicle.id)}>Modify</button>
<button className={styles.deleteButton} onClick={() => handleDelete(vehicle.id)}>Delete</button>
  </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

  
  

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
