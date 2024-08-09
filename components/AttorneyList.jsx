import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Snackbar,
  Tooltip,
  Alert,
  AlertTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddAttorneyDialog from './AddAttorneyDialog';
import UpdateAttorneyDialog from './UpdateAttorneyDialog';
import PriceMapModal from './PriceMapModal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const AttorneyList = observer(() => {
  const { attorney, options } = useStore();
  const { attorneys, fetchAttorneys, createAttorney, updateAttorney, deleteAttorney } = attorney;
  const { fetchOptions } = options;
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [attorneyToDelete, setAttorneyToDelete] = useState(null);
  const [priceMapModalOpen, setPriceMapModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchAttorneys();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/options');
      const data = await res.json();
      if (data.success) {
        fetchOptions(data);
      } else {
        console.error('Failed to fetch options:', data);
      }
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setSnackbarMessage('Use this form to add a new attorney.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenUpdateDialog = (attorney) => {
    setSelectedAttorney(attorney);
    setUpdateDialogOpen(true);
    setSnackbarMessage('Use this form to update the attorney details.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedAttorney(null);
  };

  const handleAddAttorney = async (newAttorney) => {
    try {
      await createAttorney(newAttorney);
      fetchAttorneys(); // Ensure the list is reloaded after adding
      handleCloseDialog();
      setSnackbarMessage('Attorney added successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message || 'Failed to add attorney');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdateAttorney = async (updatedAttorney) => {
    await updateAttorney(updatedAttorney);
    handleCloseUpdateDialog();
    fetchAttorneys(); // Ensure the list is reloaded after update
    setSnackbarMessage('Attorney updated successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleOpenConfirmDialog = (attorney) => {
    setAttorneyToDelete(attorney);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setAttorneyToDelete(null);
  };

  const handleDeleteAttorney = async () => {
    if (!attorneyToDelete) return;
    await deleteAttorney(attorneyToDelete);
    fetchAttorneys(); // Ensure the list is reloaded after delete
    handleCloseConfirmDialog();
    setSnackbarMessage('Attorney deleted successfully.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleViewPriceMap = (attorney) => {
    setSelectedAttorney(attorney);
    setPriceMapModalOpen(true);
    setSnackbarMessage("Viewing the attorney's pricing map.");
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleClosePriceMapModal = () => {
    setPriceMapModalOpen(false);
    setSelectedAttorney(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
              Attorney Management
            </Typography>
            <Typography variant="body1" paragraph>
              This is the admin page where you can manage attorneys. You can add a new attorney with
              their pricing, edit an attorney&apos;s details, delete an attorney, and manage their
              pricing.
            </Typography>
          </Paper>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{ marginBottom: '20px' }}
            >
              Add Attorney
            </Button>
            <Link href="/" passHref>
              <Button variant="contained" color="secondary" sx={{ marginBottom: '20px' }}>
                Front
              </Button>
            </Link>
          </Box>
        </Box>
        {isMobile ? (
          <Grid container spacing={2}>
            {attorneys.map((attorney) => (
              <Grid item xs={12} key={attorney._id}>
                <Card sx={{ backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="h6">{attorney.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {attorney.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {attorney.phone}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {attorney.address}
                    </Typography>
                    <Typography variant="body2" color={attorney.enabled ? 'primary' : 'error'}>
                      {attorney.enabled ? 'Active' : 'Inactive'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Edit Attorney">
                      <IconButton
                        onClick={() => handleOpenUpdateDialog(attorney)}
                        color="secondary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Attorney">
                      <IconButton onClick={() => handleOpenConfirmDialog(attorney)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Pricing">
                      <Button
                        size="small"
                        onClick={() => handleViewPriceMap(attorney)}
                        color="primary"
                        startIcon={<VisibilityIcon />}
                      >
                        View Pricing
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{ color: 'white' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                  <TableCell sx={{ color: 'white' }}>Address</TableCell>
                  <TableCell sx={{ color: 'white' }}>Active</TableCell>
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  <TableCell sx={{ color: 'white' }}>View Pricing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attorneys.map((attorney) => (
                  <TableRow key={attorney._id}>
                    <TableCell>{attorney.name}</TableCell>
                    <TableCell>{attorney.email}</TableCell>
                    <TableCell>{attorney.phone}</TableCell>
                    <TableCell>{attorney.address}</TableCell>
                    <TableCell>{attorney.enabled ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit Attorney">
                        <IconButton
                          onClick={() => handleOpenUpdateDialog(attorney)}
                          color="secondary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Attorney">
                        <IconButton onClick={() => handleOpenConfirmDialog(attorney)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Pricing">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewPriceMap(attorney)}
                          startIcon={<VisibilityIcon />}
                        >
                          View Pricing
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <AddAttorneyDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          handleAdd={handleAddAttorney}
        />
        {selectedAttorney && (
          <UpdateAttorneyDialog
            open={updateDialogOpen}
            handleClose={handleCloseUpdateDialog}
            attorney={selectedAttorney}
            handleUpdate={handleUpdateAttorney}
            courts={options.courts}
            counties={options.counties}
            violations={options.violations}
          />
        )}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleCloseConfirmDialog}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to delete this attorney and all their pricing maps? This action
              is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteAttorney} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        {selectedAttorney && (
          <PriceMapModal
            open={priceMapModalOpen}
            handleClose={handleClosePriceMapModal}
            attorneyId={selectedAttorney._id}
            attorneyName={selectedAttorney.name}
          />
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            <AlertTitle>{snackbarSeverity.charAt(0).toUpperCase() + snackbarSeverity.slice(1)}</AlertTitle>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
});

export default AttorneyList;
