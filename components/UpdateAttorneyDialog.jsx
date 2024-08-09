import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Typography,
  Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UpdateAttorneyDialog = observer(({ open, handleClose, attorney, handleUpdate, courts, counties, violations }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [priceMaps, setPriceMaps] = useState([]);

  useEffect(() => {
    if (attorney) {
      setName(attorney.name || '');
      setEmail(attorney.email || '');
      setPhone(attorney.phone || '');
      setAddress(attorney.address || '');
      setEnabled(attorney.enabled || true);
      if (attorney.priceMaps) {
        setPriceMaps(attorney.priceMaps.map(pm => ({
          _id: pm._id || null, // Keep the ID to ensure existing priceMaps are updated
          court: courts.find(court => court._id === pm.court) || null,
          county: counties.find(county => county._id === pm.county) || null,
          violation: violations.find(violation => violation._id === pm.violation) || null,
          points: pm.points || '',
          price: pm.price || ''
        })));
      }
    }
  }, [attorney, courts, counties, violations]);

  const handleAddPriceMap = () => {
    setPriceMaps([...priceMaps, { _id: null, court: null, county: null, violation: null, points: '', price: '' }]);
  };

  const handleRemovePriceMap = (index) => {
    setPriceMaps(priceMaps.filter((_, i) => i !== index));
  };

  const handleChangePriceMap = (index, field, value) => {
    const newPriceMaps = priceMaps.map((priceMap, i) =>
      i === index ? { ...priceMap, [field]: value } : priceMap
    );
    setPriceMaps(newPriceMaps);
  };

  const handleSubmit = () => {
    const updatedAttorney = {
      ...attorney,
      name,
      email,
      phone,
      address,
      enabled,
      priceMaps: priceMaps.map(pm => ({
        _id: pm._id, // Include _id to ensure existing priceMaps are updated
        court: pm.court ? pm.court._id : null,
        county: pm.county ? pm.county._id : null,
        violation: pm.violation ? pm.violation._id : null,
        points: pm.points,
        price: pm.price
      })),
    };
    handleUpdate(updatedAttorney);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">Update Attorney</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update the attorney, please modify the following information.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* Add logic for handling priceMaps if required */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UpdateAttorneyDialog;
