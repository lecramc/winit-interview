import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const PriceMapTable = ({ priceMaps }) => {
  if (!priceMaps || priceMaps.length === 0) {
    return <Typography variant="body1">No price maps available.</Typography>
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, m: 'auto', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Attorney Price Maps
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table aria-label="price map table">
          <TableHead>
            <TableRow>
              <TableCell>Attorney</TableCell>
              <TableCell>Court</TableCell>
              <TableCell>County</TableCell>
              <TableCell>Violation</TableCell>
              <TableCell align="center">Points Range</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceMaps.map((priceMap) => (
              <TableRow key={priceMap._id}>
                <TableCell>{priceMap.attorney?.name || 'N/A'}</TableCell>
                <TableCell>{priceMap.court?.name || 'N/A'}</TableCell>
                <TableCell>{priceMap.county?.name || 'N/A'}</TableCell>
                <TableCell>{priceMap.violation?.description || 'N/A'}</TableCell>
                <TableCell align="center">{priceMap.pointsRange?.join(' - ') || 'N/A'}</TableCell>
                <TableCell align="right">${priceMap.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default PriceMapTable
