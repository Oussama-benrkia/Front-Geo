"use client";
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
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBZG1pbiJ9XSwic3ViIjoiQWRtaW5AQWRtaW4uY29tIiwiaWF0IjoxNzE2MTE5MTAwLCJleHAiOjE3MTY3MjM5MDB9.B2yEvK17qVKGd37fq4ZTKFD1yIKmjP7GClSLNp9dHZw`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data);
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
    return <div className={styles.error}>Error loading users: {error.message}</div>;
  }

  const handleAddNewUser = () => {
    router.push('/add-user');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBZG1pbiJ9XSwic3ViIjoiQWRtaW5AQWRtaW4uY29tIiwiaWF0IjoxNzE2MTE5MTAwLCJleHAiOjE3MTY3MjM5MDB9.B2yEvK17qVKGd37fq4ZTKFD1yIKmjP7GClSLNp9dHZw`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Failed to delete user: Forbidden (403)');
        }
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== id));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error);
    }
  };

  const handleModify = (id) => {
    // Implement modify user functionality here
    console.log(`Modify user with ID: ${id}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={handleAddNewUser}>Add New User</button>
      <table className={styles.userstable}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className={styles.modifyButton} onClick={() => handleModify(user.id)}>Modify</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>Delete</button>
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
