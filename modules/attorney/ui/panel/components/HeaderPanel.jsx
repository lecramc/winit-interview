import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const HeaderPanel = () => (
  <>
    <Typography variant="h4" gutterBottom align="center">
      Attorneys Panel
    </Typography>
    <Grid container justifyContent="center" sx={{ mb: 4 }}>
      <Grid item>
        <Link href="/attorneys-panel/create" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0B3D91',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#082567',
              },
            }}
          >
            Create New Attorney
          </Button>
        </Link>
      </Grid>
    </Grid>
  </>
)

export default HeaderPanel
