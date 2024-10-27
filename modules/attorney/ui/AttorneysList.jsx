import React, { useState } from 'react'
import { Box, Chip, List, ListItem, Pagination, Typography } from '@mui/material'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomAccordion from '@/modules/app/components/accordion/CustomAccordion.jsx'

const AttorneysList = ({
  attorneys,
  editAttorney,
  deleteAttorney,
  createAttorney,
  itemsPerPage = 5,
}) => {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(attorneys.length / itemsPerPage)

  const handlePageChange = (event, value) => setPage(value)

  const paginatedAttorneys = attorneys.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Box display="flex" flexDirection="column" flex={1} border={0}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h6">Attorneys List</Typography>
        <CustomButton variant="contained" color="primary" onClick={createAttorney}>
          Create Attorney
        </CustomButton>
      </Box>

      <List sx={{ width: '100%' }}>
        {paginatedAttorneys.map((attorney) => (
          <ListItem key={attorney._id} sx={{ padding: 0, borderRadius: 0 }}>
            <CustomAccordion
              itemStart={attorney.name}
              itemEnd={
                <Chip
                  label={attorney.enable ? 'Active' : 'Inactive'}
                  size="small"
                  color={attorney.enable ? 'success' : 'error'}
                  variant="outlined"
                />
              }
              customStyles={{
                accordion: { width: '100%' },
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">
                  <strong>Address:</strong> {attorney.address || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Email :</strong> {attorney.email || 'N/A'}
                </Typography>{' '}
                <Typography variant="body2">
                  <strong>Phone :</strong> {attorney.phone || 'N/A'}
                </Typography>
              </Box>
              <Box display="flex" gap={1} mt={2} justifyContent={'flex-end'}>
                <CustomButton color="error" onClick={() => deleteAttorney(attorney)}>
                  Delete
                  <DeleteIcon />
                </CustomButton>
                <CustomButton
                  variant="outlined"
                  color="info"
                  onClick={() => editAttorney(attorney._id)}
                  endIcon={<EditIcon />}
                >
                  Edit
                </CustomButton>
              </Box>
            </CustomAccordion>
          </ListItem>
        ))}
      </List>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, alignSelf: 'center' }}
      />
    </Box>
  )
}

export default AttorneysList
