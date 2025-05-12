import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddLocation } from '@mui/icons-material';
import AddressCard from '../Cart/AddressCard';

const Address = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', street: '', city: '', zip: '' });
  const [addresses, setAddresses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const stored = localStorage.getItem('addresses');
    if (stored) setAddresses(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({ name: '', street: '', city: '', zip: '' });
    setEditIndex(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.street || !formData.city || !formData.zip) {
      showSnackbar('Please fill all fields', 'error');
      return;
    }

    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = formData;
      setAddresses(updated);
      showSnackbar('Address updated!');
    } else {
      setAddresses((prev) => [...prev, formData]);
      showSnackbar('New address added!');
    }

    handleClose();
  };

  const handleEdit = (address) => {
    const index = addresses.findIndex((a) => a === address);
    setEditIndex(index);
    setFormData(address);
    setOpen(true);
  };

  const handleDelete = (address) => {
    const updated = addresses.filter((a) => a !== address);
    setAddresses(updated);
    showSnackbar('Address deleted!', 'info');
  };

  const createOrderUsingSelectedAddress = (address) => {
    console.log('Selected Address for order:', address);
    showSnackbar('Address selected!', 'success');
  };

  return (
    <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
      <div>
        <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>

        <div className="flex gap-5 flex-wrap justify-center">
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              item={address}
              handleSelectAddress={() => createOrderUsingSelectedAddress(address)}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showButton={true}
            />
          ))}

          <Card className="flex flex-col items-center gap-5 w-64 p-5">
            <AddLocation />
            <div className="space-y-3 text-gray-500 w-full">
              <h1 className="font-semibold text-lg text-white">Add New Address</h1>
              <Button variant="outlined" fullWidth onClick={handleOpen}>
                Add
              </Button>
            </div>
          </Card>
        </div>

        {/* Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogContent className="space-y-4 py-4">
            <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
            <TextField label="Street" name="street" fullWidth value={formData.street} onChange={handleChange} />
            <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} />
            <TextField label="ZIP Code" name="zip" fullWidth value={formData.zip} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editIndex !== null ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
};

export default Address;
