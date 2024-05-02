import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
function Forms() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/vehicule')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);
  return (
    <>
      <div>
        <table className={styles.userstable}>
          <tr className={styles.tr1}>
            <th className={styles.th1}>ID</th>
            <th className={styles.th1}>Matricule</th>
            <th className={styles.th1}>Nom</th>
            <th className={styles.th1}>Modele</th>
            <th className={styles.th1}>Etat</th>
            <th className={styles.th1}>Status</th>
            <th className={styles.th1}>type</th>
          </tr>
          {users.map((user, i) => (
            <tr className={styles.tr1}>
              <td className={styles.th1}>{user.id}</td>
              <td className={styles.th1}>{user.matricule}</td>
              <td className={styles.th1}>{user.nom}</td>
              <td className={styles.th1}>{user.modele}</td>
              <td className={styles.th1}>{user.etat}</td>
              <td className={styles.th1}>{user.status}</td>
              <td className={styles.th1}>{user.type}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

Forms.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
