import { useRouter } from 'next/router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';

function Forms() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:8081/api/vehicule', {
          method: 'GET',// or POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBZG1pbiJ9XSwic3ViIjoiQWRtaW5AQWRtaW4uY29tIiwiaWF0IjoxNzE2MTE5MTAwLCJleHAiOjE3MTY3MjM5MDB9.B2yEvK17qVKGd37fq4ZTKFD1yIKmjP7GClSLNp9dHZw`,
            'Content-Type': 'application/json',
          }
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
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading vehicles</div>;
  }
  /*const handleModify = (id) => {
    
    console.log(`Modify vehicle with ID: ${id}`);
      navigate(`/edit-vehicle/${id}`);
  
  };*/

  const handleDelete = (id) => {
    console.log(`Delete vehicle with ID: ${id}`);
    // Implement delete functionality here
  };

  const handleAddNewVehicle = () => {
    console.log("Add new vehicle");
    // Implement add new vehicle functionality here
  };
  return (
    <>
      <CContainer className="reservations-management-container">
        <CRow className="justify-content-center">
          <CCol md={12}></CCol>
          <CCard>
            <CCardBody>
              <h2>Reservations Management Page</h2>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">ID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Matricule</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nom</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Modele</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Etat</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Type</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-end">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vehicles.map(vehicle => (
                    <CTableRow key={vehicle.id}>
                      <CTableDataCell>{vehicle.id}</CTableDataCell>
                      <CTableDataCell>{vehicle.matricule}</CTableDataCell>
                      <CTableDataCell>{vehicle.nom}</CTableDataCell>
                      <CTableDataCell>{vehicle.modele}</CTableDataCell>
                      <CTableDataCell>{vehicle.etat}</CTableDataCell>
                      <CTableDataCell>{vehicle.status}</CTableDataCell>
                      <CTableDataCell>{vehicle.type}</CTableDataCell>
                      <CTableDataCell className="text-end">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          {/* <CButton
                            className="me-md-2 delete-button"
                            color="danger"
                            shape="rounded-pill"
                            onClick={() => deleteReservation(reservation.id)}
                          >
                            Delete
                          </CButton>
                          <CButton
                            color="info" shape="rounded-pill" as={Link} to={`/actions/update-reservation/${reservation.id}`}>Update
                          </CButton> */}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>

      <div className={styles.container}>
        <button className={styles.addButton} onClick={handleAddNewVehicle}>Add New Vehicle</button>
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
              <th className={styles.th1}>Action</th>
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
                  <td className={styles.th1}>
                    <button className={styles.modifyButton} onClick={() => handleModify(vehicle.id)}>Modify</button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(vehicle.id)}>Delete</button>
                  </td>
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
