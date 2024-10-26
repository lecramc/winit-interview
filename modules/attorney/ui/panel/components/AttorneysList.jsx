// AttorneysDataTable.jsx
import React from 'react'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const AttorneysDataTable = ({ attorneys, editAttorney, deleteAttorney, onCreate }) => {
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
        <CustomButton onClick={onCreate}>Create Attorney</CustomButton>
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
            <ListItemText
              primary={attorney.name}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    Email: {attorney.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {attorney.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {attorney.phone}
                  </Typography>
                </>
              }
            />
            <Box display="flex" gap={1} mt={{ xs: 1, sm: 0 }}>
              <CustomButton onClick={() => editAttorney(attorney._id)} startIcon={<EditIcon />}>
                Edit
              </CustomButton>
              <CustomButton onClick={() => deleteAttorney(attorney._id)} startIcon={<DeleteIcon />}>
                Delete
              </CustomButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AttorneysDataTable
