import React from 'react'
import { Box, Divider, List, ListItem, Typography } from '@mui/material'

const PriceMapList = ({ priceMaps }) => {
  if (!priceMaps || priceMaps.length === 0) {
    return <Typography variant="body1">No price maps available.</Typography>
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Attorney Price Maps
      </Typography>
      <List>
        {priceMaps.map((priceMap, index) => (
          <React.Fragment key={priceMap._id}>
            <ListItem
              alignItems="flex-start"
              sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <Typography variant="subtitle1">
                Attorney: {priceMap.attorney?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Court: {priceMap.court?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                County: {priceMap.county?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Violation: {priceMap.violation?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points Range: {priceMap.pointsRange?.join(' - ') || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${priceMap.price.toFixed(2)}
              </Typography>
            </ListItem>
            {index < priceMap.length - 1 && <Divider sx={{ width: '100%', my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default PriceMapList
