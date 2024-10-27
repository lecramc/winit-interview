import React from 'react'
import { Chip } from '@mui/material'
import CustomTable from '@/modules/app/components/table/CustomTable.jsx'

const columns = [
  { headerName: 'Name', field: 'name' },
  {
    headerName: 'Traffic State',
    field: 'trafficState.longName',
    render: (value) => value || 'N/A',
  },
  {
    headerName: 'Enable',
    field: 'enable',
    align: 'center',
    render: (value) => (
      <Chip
        color={value ? 'success' : 'default'}
        variant="outlined"
        label={value ? 'Enable' : 'Disabled'}
      />
    ),
  },
]

const TrafficCountyTable = ({ trafficCounties, onEdit, onDelete }) => {
  return (
    <CustomTable
      columns={columns}
      data={trafficCounties}
      title="Traffic Counties"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default TrafficCountyTable
