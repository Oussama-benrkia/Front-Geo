// pages/add-user.js
import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './components/forms/styles.module.css';
import SidebarLayout from 'src/layouts/SidebarLayout';
function AddUser() {
  const [id, setId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8081/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      console.log('User added successfully');
      router.push('/'); // Navigate back to the main page or user list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>ID:</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>First Name:</label>
          <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name:</label>
          <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
            <div className={styles.formGroup}>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="User">User</option>
  <option value="Admin">Admin</option>
</select>
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.submitButton}>Add User</button>
      </form>
    </div>
  );
}
AddUser.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default AddUser;
