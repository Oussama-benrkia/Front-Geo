// pages/edit-vehicle/[id].js

import { useRouter } from 'next/router';
import EditVehicle from '../../components/EditVehicle';

const EditVehiclePage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log('Router query:', router.query); // Add this line to verify the router query

  if (!id) {
    return <div>Loading...</div>; // Handle the case when `id` is not available yet
  }

  return <EditVehicle id={id} />;
};
EditVehiclePage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default EditVehiclePage;
