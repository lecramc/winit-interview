import React from 'react'
import { Chip } from '@mui/material'
import CustomTable from '@/modules/app/components/table/CustomTable.jsx'

const columns = [
  { headerName: 'Attorney', field: 'attorney.name' },
  { headerName: 'Court', field: 'court.name' },
  { headerName: 'County', field: 'county.name' },
  { headerName: 'Violation', field: 'violation.name' },
  {
    headerName: 'Points Range',
    field: 'pointsRange',
    render: (value) => value?.join(' - ') || '',
  },
  {
    headerName: 'Price',
    field: 'price',
    align: 'right',
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    headerName: 'Enable',
    field: 'enable',
    align: 'center',
    render: (value) => (
      <Chip color="success" variant="outlined" label={value ? 'Enable' : 'Disabled'} />
    ),
  },
]

const PriceMapTable = ({ priceMaps, onEdit, onDelete }) => {
  return (
    <CustomTable
      columns={columns}
      data={priceMaps}
      title="Attorney Price Maps"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default PriceMapTable
