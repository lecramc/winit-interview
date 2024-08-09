import React, { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
  Grid,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/StoreContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const filter = createFilterOptions()

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1200px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const PriceMapModal = observer(({ open, handleClose, attorneyId, attorneyName }) => {
  const { options } = useStore()
  const { courts, counties, violations, fetchOptions } = options
  const [priceMaps, setPriceMaps] = useState([])
  const [editPriceMap, setEditPriceMap] = useState(null)
  const [newPriceMap, setNewPriceMap] = useState(null)
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (open && attorneyId) {
      const fetchPriceMaps = async () => {
        try {
          const res = await fetch(`/api/attorney-price-map/${attorneyId}`)
          const data = await res.json()
          if (data.success) {
            setPriceMaps(data.data)
          }
        } catch (error) {
          console.error('Failed to fetch price maps:', error)
        }
      }

      fetchPriceMaps()
    }
  }, [open, attorneyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/options')
        const data = await res.json()
        if (data.success) {
          fetchOptions(data) // Assuming fetchOptions will update the store with the fetched data
        }
      } catch (error) {
        console.error('Failed to fetch options:', error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchData()
    }
  }, [fetchOptions, open])

  const handleEditClick = (priceMap) => {
    setEditPriceMap(priceMap)
  }

  const handleEditChange = (field, value) => {
    setEditPriceMap((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditSave = async () => {
    try {
      const res = await fetch(`/api/attorney-price-map/${editPriceMap._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPriceMap),
      })
      const data = await res.json()
      if (data.success) {
        setPriceMaps((prev) => prev.map((pm) => (pm._id === editPriceMap._id ? editPriceMap : pm)))
        setEditPriceMap(null)
      }
    } catch (error) {
      console.error('Failed to update price map:', error)
    }
  }

  const handleAddClick = () => {
    setNewPriceMap({
      court: null,
      county: null,
      violation: null,
      points: '',
      price: '',
    })
  }

  const handleAddChange = (field, value) => {
    setNewPriceMap((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddSave = async () => {
    try {
      const res = await fetch(`/api/attorney-price-map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attorneyId,
          ...newPriceMap,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPriceMaps((prev) => [...prev, data.data])
        setNewPriceMap(null)
      }
    } catch (error) {
      console.error('Failed to add price map:', error)
    }
  }

  const handleDeleteClick = async (id) => {
    try {
      const res = await fetch(`/api/attorney-price-map/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.success) {
        setPriceMaps((prev) => prev.filter((pm) => pm._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete price map:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditPriceMap(null)
  }

  const handleCancelAdd = () => {
    setNewPriceMap(null)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Price list for {attorneyName}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Court</TableCell>
                <TableCell>County</TableCell>
                <TableCell>Violation</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceMaps.map((priceMap) => (
                <TableRow
                  key={priceMap._id}
                  style={editPriceMap && editPriceMap._id !== priceMap._id ? { opacity: 0.5 } : {}}
                >
                  <TableCell>{priceMap.court?.name || ''}</TableCell>
                  <TableCell>{priceMap.county?.name || ''}</TableCell>
                  <TableCell>{priceMap.violation?.name}</TableCell>
                  <TableCell>[{priceMap.points}]</TableCell> {/* Displaying points with square brackets */}
                  <TableCell>{priceMap.price}$</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(priceMap)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(priceMap._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ display: { xs: 'block', sm: 'none' } }}>
          {priceMaps.map((priceMap) => (
            <Grid item xs={12} key={priceMap._id}>
              <Paper
                sx={{ p: 2, opacity: editPriceMap && editPriceMap._id !== priceMap._id ? 0.5 : 1 }}
              >
                <Typography variant="body1">
                  <strong>Court:</strong> {priceMap.court?.name || ''}
                </Typography>
                <Typography variant="body1">
                  <strong>County:</strong> {priceMap.county?.name || ''}
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
                <IconButton onClick={() => handleEditClick(priceMap)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(priceMap._id)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {editPriceMap && (
          <Box mt={2}>
            <Typography variant="h6">Edit Price Map</Typography>
            <form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={editPriceMap.court}
                    onChange={(event, newValue) => {
                      handleEditChange('court', newValue)
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)
                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          title: `Add "${params.inputValue}"`,
                        })
                      }
                      return filtered
                    }}
                    options={courts}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.name
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
                    freeSolo
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={editPriceMap.county}
                    onChange={(event, newValue) => {
                      handleEditChange('county', newValue)
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)
                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          title: `Add "${params.inputValue}"`,
                        })
                      }
                      return filtered
                    }}
                    options={counties}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.name
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
                    freeSolo
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={editPriceMap.violation}
                    onChange={(event, newValue) => {
                      handleEditChange('violation', newValue)
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)
                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          title: `Add "${params.inputValue}"`,
                        })
                      }
                      return filtered
                    }}
                    options={violations}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      return option.name
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
                    freeSolo
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Points"
                    fullWidth
                    type="number"
                    value={editPriceMap.points}
                    onChange={(e) => handleEditChange('points', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Price"
                    fullWidth
                    type="number"
                    value={editPriceMap.price}
                    onChange={(e) => handleEditChange('price', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button onClick={handleEditSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            </form>
          </Box>
        )}
        {newPriceMap && (
          <Box mt={2}>
            <Typography variant="h6">Add New Price Map</Typography>
            <Paper sx={{ p: 2 }}>
              <Autocomplete
                value={newPriceMap.court}
                onChange={(event, newValue) => {
                  handleAddChange('court', newValue)
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    })
                  }
                  return filtered
                }}
                options={courts}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option
                  }
                  if (option.inputValue) {
                    return option.inputValue
                  }
                  return option.name
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
                freeSolo
              />
              <Autocomplete
                value={newPriceMap.county}
                onChange={(event, newValue) => {
                  handleAddChange('county', newValue)
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    })
                  }
                  return filtered
                }}
                options={counties}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option
                  }
                  if (option.inputValue) {
                    return option.inputValue
                  }
                  return option.name
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
                freeSolo
              />
              <Autocomplete
                value={newPriceMap.violation}
                onChange={(event, newValue) => {
                  handleAddChange('violation', newValue)
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    })
                  }
                  return filtered
                }}
                options={violations}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option
                  }
                  if (option.inputValue) {
                    return option.inputValue
                  }
                  return option.name
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
                freeSolo
              />
              <TextField
                label="Points"
                fullWidth
                type="number"
                value={newPriceMap.points}
                onChange={(e) => handleAddChange('points', e.target.value)}
              />
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={newPriceMap.price}
                onChange={(e) => handleAddChange('price', e.target.value)}
              />
              <Button onClick={handleAddSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
              <Button
                onClick={handleCancelAdd}
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            </Paper>
          </Box>
        )}
        <IconButton onClick={handleAddClick} sx={{ mt: 2 }}>
          <AddIcon />
        </IconButton>
      </Box>
    </Modal>
  )
})

export default PriceMapModal
