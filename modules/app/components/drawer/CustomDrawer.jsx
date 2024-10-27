import { Box, Drawer, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const CustomDrawer = ({ open, onClose, title, children, width = 600 }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  )
}

export default CustomDrawer
