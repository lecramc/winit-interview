import React from 'react'
import { Chip } from '@mui/material'
import CustomTable from '@/modules/app/components/table/CustomTable.jsx'

const columns = [
  { headerName: 'Violation Name', field: 'name' },
  { headerName: 'Points', field: 'points', align: 'center' },
  {
    headerName: 'Enable',
    field: 'enable',
    align: 'center',
    render: (value) => (
      <Chip color="success" variant="outlined" label={value ? 'Enabled' : 'Disabled'} />
    ),
  },
]

const ViolationTable = ({ violations, onEdit, onDelete }) => {
  return (
    <CustomTable
      columns={columns}
      data={violations}
      title="Violations"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default ViolationTable
