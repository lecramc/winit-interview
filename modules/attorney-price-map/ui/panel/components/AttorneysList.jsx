import { observer } from 'mobx-react'
import { Button, Grid, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'
import Link from 'next/link'

const AttorneyList = observer(({ attorneys, deleteAttorney }) => {
  return (
    <List>
      {attorneys.map((attorney) => (
        <ListItem key={attorney._id} divider>
          <ListItemText primary={`${attorney.name} - ${attorney.email}`} />
          <ListItemSecondaryAction>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteAttorney(attorney._id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                      color: '#fff',
                    },
                  }}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Link href={`/attorneys-panel/edit/${attorney._id}`} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      color: '#0B5153',
                      borderColor: '#0B5153',
                      '&:hover': {
                        backgroundColor: '#0B5153',
                        color: '#fff',
                      },
                    }}
                  >
                    Edit
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
})

export default AttorneyList
