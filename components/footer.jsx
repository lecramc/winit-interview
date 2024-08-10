import React from 'react'
import { Container, Box, Typography, Link, IconButton, Avatar } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WebIcon from '@mui/icons-material/Web'; // Import the WebIcon or LanguageIcon

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Avatar alt="Théo Garcia" src="/theo.jpeg" sx={{ width: 40, height: 40, mr: 2 }} />
        </div>
        <Typography variant="body1">Created by Théo Garcia</Typography>
        <Typography variant="body4" color="textSecondary">
          <Link href="mailto:garciatheo315@gmail.com" color="inherit">
            garciatheo315@gmail.com
          </Link>
        </Typography>

        <Box sx={{ mt: 2 }}>
          <IconButton
            component="a"
            href="https://github.com/DevForZiema"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/theogarcia597"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/garciatheo38/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.ziema.fr"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <WebIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary">
          I have two github accounts
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
