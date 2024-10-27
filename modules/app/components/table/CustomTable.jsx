import React from 'react'
import {
  Box,
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import useTableData from '@/modules/app/components/table/useCustomTable.jsx'

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const CustomTable = ({ columns, data, title, onEdit, onDelete }) => {
  const {
    filters,
    page,
    rowsPerPage,
    paginatedData,
    filteredDataCount,
    handleFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTableData(data, columns)

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
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
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
                    variant="standard"
                    size="small"
                    placeholder={column.headerName}
                    value={filters[column.field] || ''}
                    onChange={(e) => handleFilterChange(e, column.field)}
                  />
                </TableCell>
              ))}
              <TableCell
                sx={{
                  textAlign: 'center',
                  padding: '8px',
                }}
              >
                Actions
              </TableCell>
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
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(row)} color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row)} color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDataCount}
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
