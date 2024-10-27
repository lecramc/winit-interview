// hooks/useTableData.js
import { useState } from 'react'

export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const useTableData = (data, columns) => {
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

  return {
    filters,
    page,
    rowsPerPage,
    paginatedData,
    filteredDataCount: filteredData.length,
    handleFilterChange,
    handleChangePage,
    handleChangeRowsPerPage,
  }
}

export default useTableData
