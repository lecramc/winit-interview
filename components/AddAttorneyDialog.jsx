import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createFilterOptions } from '@mui/material/Autocomplete';
import ErrorAlert from './ErrorAlert'; // Import the ErrorAlert component

const filter = createFilterOptions();

const AddAttorneyDialog = ({ open, handleClose, handleAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [priceMaps, setPriceMaps] = useState([
    { court: '', county: '', violation: '', points: '', price: '' },
  ]);
  const [options, setOptions] = useState({
    courts: [],
    counties: [],
    violations: []
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch('/api/options');
        const data = await res.json();
        if (data.success) {
          setOptions({
            courts: data.courts,
            counties: data.counties,
            violations: data.violations
          });
        }
      } catch (error) {
        console.error('Failed to fetch options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleAddPriceMap = () => {
    setPriceMaps([...priceMaps, { court: '', county: '', violation: '', points: '', price: '' }]);
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

  const handleSubmit = async () => {
    setErrorMessage('');
    const newAttorney = {
      name,
      email,
      phone,
      address,
      enabled,
      priceMaps,
    };
    try {
      await handleAdd(newAttorney);
      handleClose();
    } catch (error) {
      setErrorMessage(error.message || 'Failed to add attorney');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">Add an Attorney</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add an attorney, please fill out the following information.
        </DialogContentText>
        {errorMessage && (
          <ErrorAlert message={errorMessage} /> // Use the ErrorAlert component
        )}
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
        <Box mt={2}>
          <Typography variant="h6">Price Maps</Typography>
          {priceMaps.map((priceMap, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={3}>
                <Autocomplete
                  value={priceMap.court}
                  onChange={(event, newValue) => {
                    handleChangePriceMap(index, 'court', newValue);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  options={options.courts}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Court"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  value={priceMap.county}
                  onChange={(event, newValue) => {
                    handleChangePriceMap(index, 'county', newValue);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  options={options.counties}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="County"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  value={priceMap.violation}
                  onChange={(event, newValue) => {
                    handleChangePriceMap(index, 'violation', newValue);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  options={options.violations}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Violation"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Points"
                  fullWidth
                  type="number"
                  value={priceMap.points}
                  onChange={(e) => handleChangePriceMap(index, 'points', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Price"
                  fullWidth
                  type="number"
                  value={priceMap.price}
                  onChange={(e) => handleChangePriceMap(index, 'price', e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleRemovePriceMap(index)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAddPriceMap} color="primary">
            Add a Price Map
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAttorneyDialog;
