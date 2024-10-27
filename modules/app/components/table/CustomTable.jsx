import React, { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/system/colorManipulator'

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const CustomTable = ({ columns, data, title }) => {
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleFilterChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredData = data.filter((row) =>
    columns.every((column) => {
      const value = getNestedValue(row, column.field) || ''
      const filterValue = filters[column.field] || ''
      return value.toString().toLowerCase().includes(filterValue.toLowerCase())
    }),
  )

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (!data || data.length === 0) {
    return <Typography variant="body1">No data available.</Typography>
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, m: 'auto', p: 1 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      <TableContainer
        component={Paper}
        sx={{ width: 'auto', boxShadow: 1, borderRadius: 1, overflow: 'hidden' }}
      >
        <Table aria-label="data table">
          <TableHead>
            <TableRow sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2) }}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: column.align || 'left',
                    padding: '8px',
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder={column.headerName}
                    value={filters[column.field] || ''}
                    onChange={(e) => handleFilterChange(e, column.field)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={row._id || index}
                sx={{
                  bgcolor: index % 2 === 0 ? 'background.paper' : 'grey.100',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align || 'left'}>
                    {column.render
                      ? column.render(getNestedValue(row, column.field))
                      : getNestedValue(row, column.field) || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default CustomTable
