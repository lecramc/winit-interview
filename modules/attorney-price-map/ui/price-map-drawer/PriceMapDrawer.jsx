import { Box, Drawer, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PriceMapForm from '@/modules/attorney-price-map/ui/price-map-drawer/PriceMapForm.jsx'
import useStore from '@/modules/app/hooks/useStore.js'

const PriceMapDrawer = ({ open, onClose }) => {
  const store = useStore()
  const selectedPriceMap = store.attorneyPriceMap.getSelectedPriceMap()

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {selectedPriceMap ? 'Edit Price Map' : 'Create Price Map'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <PriceMapForm selectedPriceMap={selectedPriceMap} onClose={onClose} />
      </Box>
    </Drawer>
  )
}

export default PriceMapDrawer
