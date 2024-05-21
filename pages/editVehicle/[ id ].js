// pages/edit-vehicle/[id].js

import { useRouter } from 'next/router';
import EditVehicle from '../../components/EditVehicle';

const EditVehiclePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EditVehicle vehicleId={id} />;
};

export default EditVehiclePage;
