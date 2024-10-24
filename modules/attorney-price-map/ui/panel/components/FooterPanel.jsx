import { Button, Grid } from '@mui/material'
import Link from 'next/link'

const FooterPanel = () => (
  <Grid container justifyContent="center" sx={{ mt: 4 }}>
    <Grid item>
      <Link href="/attorney-price-maps" passHref>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#424242',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#212121',
            },
          }}
        >
          View Price Maps
        </Button>
      </Link>
    </Grid>
  </Grid>
)

export default FooterPanel
