import React from 'react'
import { Chip } from '@mui/material'
import CustomTable from '@/modules/app/components/table/CustomTable.jsx'

const columns = [
  { headerName: 'Long Name', field: 'longName' },
  { headerName: 'Short Name', field: 'shortName' },
  {
    headerName: 'Enabled',
    field: 'enable',
    align: 'center',
    render: (value) => (
      <Chip color="success" variant="outlined" label={value ? 'Enabled' : 'Disabled'} />
    ),
  },
]

const TrafficStateTable = ({ trafficStates, onEdit, onDelete }) => {
  return (
    <CustomTable
      columns={columns}
      data={trafficStates}
      title="Traffic States"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default TrafficStateTable
