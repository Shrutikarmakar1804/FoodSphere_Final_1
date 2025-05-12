import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

const AddressCard = ({ item, showButton, handleSelectAddress, handleEdit, handleDelete }) => {
  return (
    <Card className="flex flex-col gap-3 w-64 p-5">
      <div className="flex items-center gap-2">
        <HomeIcon />
        <h1 className="font-semibold text-lg text-white">{item.name || 'Home'}</h1>
      </div>
      <p className="text-gray-500">
        {item.street}, {item.city} - {item.zip}
      </p>
      <div className="flex gap-2">
        {showButton && (
          <Button variant="outlined" onClick={() => handleSelectAddress(item)} fullWidth>
            Select
          </Button>
        )}
        <Button variant="outlined" color="info" onClick={() => handleEdit(item)}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default AddressCard;
