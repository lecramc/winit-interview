import React from 'react'
import { Chip } from '@mui/material'
import CustomTable from '@/modules/app/components/table/CustomTable.jsx'

const columns = [
  { headerName: 'Court Name', field: 'name' },
  { headerName: 'Address', field: 'address' },
  { headerName: 'Traffic State', field: 'trafficState.name' },
  { headerName: 'Traffic County', field: 'trafficCounty.name' },
  {
    headerName: 'Enable',
    field: 'enable',
    align: 'center',
    render: (value) => (
      <Chip color="success" variant="outlined" label={value ? 'Enable' : 'Disabled'} />
    ),
  },
]

const TrafficCourtTable = ({ trafficCourts, onEdit, onDelete }) => {
  return (
    <CustomTable
      columns={columns}
      data={trafficCourts}
      title="Traffic Courts"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default TrafficCourtTable
