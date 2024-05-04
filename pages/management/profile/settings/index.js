import { useState, ChangeEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SidebarLayout from 'src/layouts/SidebarLayout';

function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState('activity');
  


  const tabs = [
    { value: 'activity', label: 'Activity' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' }
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const position = [51.505, -0.09];

  return (
    <>
      { currentTab === 'activity' && (
        <MapContainer center={position} zoom={18} scrollWheelZoom={false} style={{ height: '80vh', width: '90%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
