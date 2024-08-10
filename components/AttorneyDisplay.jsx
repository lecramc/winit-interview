import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/StoreContext'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  TextField,
  Box,
  Snackbar,
  Alert,
  AlertTitle
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const AttorneyDisplay = observer(() => {
  const { attorney, options } = useStore()
  const { attorneys, fetchAttorneys } = attorney
  const { courts, counties, violations, fetchOptions } = options
  const [selectedAttorney, setSelectedAttorney] = useState(null)
  const [priceMaps, setPriceMaps] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceMapSearchQuery, setPriceMapSearchQuery] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    fetchAttorneys()
  }, [fetchAttorneys])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/options')
        const data = await res.json()
        if (data.success) {
          fetchOptions(data)
        }
      } catch (error) {
        console.error('Failed to fetch options:', error)
      }
    }

    fetchData()
  }, [fetchOptions])

  const handleOpenDialog = async (attorney) => {
    setSelectedAttorney(attorney)
    setDialogOpen(true)
    setSnackbarMessage("Viewing the attorney's pricing map.")
    setSnackbarSeverity('info')
    setSnackbarOpen(true)

    try {
      const res = await fetch(`/api/attorney-price-map/${attorney._id}`)
      const data = await res.json()
      if (data.success) {
        setPriceMaps(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch price maps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedAttorney(null)
    setPriceMaps([])
    setLoading(true)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handlePriceMapSearchChange = (event) => {
    setPriceMapSearchQuery(event.target.value)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const filteredAttorneys = attorneys.filter((attorney) => {
    return (
      attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attorney.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attorney.phone.includes(searchQuery)
    )
  })

  const filteredPriceMaps = priceMaps.filter((priceMap) => {
    return (
      priceMap.court?.name.toLowerCase().includes(priceMapSearchQuery.toLowerCase()) ||
      priceMap.county?.name.toLowerCase().includes(priceMapSearchQuery.toLowerCase()) ||
      priceMap.violation?.name.toLowerCase().includes(priceMapSearchQuery.toLowerCase()) ||
      priceMap.points.toString().includes(priceMapSearchQuery) ||
      priceMap.price.toString().includes(priceMapSearchQuery)
    )
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Link href="/attorneys-panel" passHref>
          <Button variant="contained" color="secondary" sx={{ marginBottom: '20px' }}>
           ADMIN
          </Button>
        </Link>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search for a lawyer"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        {isMobile ? (
          <Grid container spacing={2}>
            {filteredAttorneys.map((attorney) => (
              <Grid item xs={12} key={attorney._id}>
                <Paper sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                  <Typography variant="h6" sx={{ color: '#1976d2' }}>
                    {attorney.name}
                  </Typography>
                  <Typography>Email: {attorney.email}</Typography>
                  <Typography>Phone: {attorney.phone}</Typography>
                  <Typography>Address: {attorney.address}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(attorney)}
                    sx={{ mt: 2 }}
                  >
                    View Pricing
                  </Button>
                </Paper>
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
                  <TableCell sx={{ color: 'white' }}>View Pricing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttorneys.map((attorney) => (
                  <TableRow key={attorney._id}>
                    <TableCell>{attorney.name}</TableCell>
                    <TableCell>{attorney.email}</TableCell>
                    <TableCell>{attorney.phone}</TableCell>
                    <TableCell>{attorney.address}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(attorney)}
                      >
                        View Pricing
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedAttorney && (
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>Pricing for {selectedAttorney.name}</DialogTitle>
            <DialogContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <TextField
                    label="Search pricing"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={priceMapSearchQuery}
                    onChange={handlePriceMapSearchChange}
                  />
                  <TableContainer component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#1976d2' }}>
                          <TableCell sx={{ color: 'white' }}>Court</TableCell>
                          <TableCell sx={{ color: 'white' }}>County</TableCell>
                          <TableCell sx={{ color: 'white' }}>Violation</TableCell>
                          <TableCell sx={{ color: 'white' }}>Points</TableCell>
                          <TableCell sx={{ color: 'white' }}>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredPriceMaps.map((priceMap) => (
                          <TableRow key={priceMap._id}>
                            <TableCell>{priceMap.court?.name || 'N/A'}</TableCell>
                            <TableCell>{priceMap.county?.name || 'N/A'}</TableCell>
                            <TableCell>{priceMap.violation?.name || 'N/A'}</TableCell>
                            <TableCell>[{priceMap.points}]</TableCell> {/* Displaying points with square brackets */}
                            <TableCell>{priceMap.price}$</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid container spacing={2} sx={{ display: { xs: 'block', sm: 'none' } }}>
                    {filteredPriceMaps.map((priceMap) => (
                      <Grid item xs={12} key={priceMap._id}>
                        <Paper sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                          <Typography variant="body1">
                            <strong>Court:</strong> {priceMap.court?.name || 'N/A'}
                          </Typography>
                          <Typography variant="body1">
                            <strong>County:</strong> {priceMap.county?.name || 'N/A'}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Violation:</strong> {priceMap.violation?.name}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Points:</strong> {priceMap.points}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Price:</strong> {priceMap.price}$
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
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
  )
})

export default AttorneyDisplay
