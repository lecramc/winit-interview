// AttorneysList.jsx
import React from 'react'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const AttorneysList = ({ attorneys, editAttorney, deleteAttorney, createAttorney }) => {
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
        <Typography variant="h6" component="div">
          Attorneys List
        </Typography>
        <CustomButton variant="contained" color="primary" onClick={createAttorney}>
          Create Attorney
        </CustomButton>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {attorneys.map((attorney) => (
          <ListItem
            key={attorney._id}
            alignItems="flex-start"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              py: { xs: 1, sm: 2 },
              borderBottom: '1px solid #eee',
            }}
          >
            <ListItemText primary={attorney.name} />
            <Box display="flex" gap={1} mt={{ xs: 1, sm: 0 }}>
              <CustomButton
                variant="outlined"
                color="info"
                onClick={() => editAttorney(attorney._id)}
                endIcon={<EditIcon />}
              >
                Edit
              </CustomButton>
              <IconButton
                variant="contained"
                color="error"
                onClick={() => deleteAttorney(attorney)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AttorneysList
