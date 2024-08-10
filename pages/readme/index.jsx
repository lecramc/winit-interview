import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Link as MuiLink,
  Avatar,
  IconButton
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web'; // Import the WebIcon or LanguageIcon
import AttorneyManagement from '@/components/ux';
import Link from 'next/link';

const Documentation = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: 'white' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: '#3f51b5', fontWeight: 'bold' }}
        >
          📚 Project Documentation
        </Typography>
        <Typography variant="body1" paragraph>
          This documentation outlines the steps I followed to build this application. It covers
          everything from the initial planning to the final implementation. The goal is to provide a
          clear understanding of the development process.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            📝 Initial Planning
          </Typography>
          <Typography variant="body1" paragraph>
            Before starting the coding process, I prepared a detailed plan for the application. I
            took notes of important points on Notion and asked ChatGPT to create a detailed action
            plan to guide me through the development process.
          </Typography>
          <Typography variant="body1" paragraph>
            I then coded the <code>&lt;AttorneyManagement&gt;</code> component which provided me
            with a global view of how the application should look.
          </Typography>
          <br />
          <br />
          <Box
            sx={{
              border: '2px solid #3f51b5', // Blue border color
              borderRadius: '8px', // Optional: rounded corners
              padding: '16px', // Optional: inner padding
              backgroundColor: 'white', // Optional: background color
            }}
          >
            <AttorneyManagement />
          </Box>{' '}
          <br />
          <br />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            🎨 Front-End Development
          </Typography>
          <Typography variant="body1" paragraph>
            Following the design steps outlined in Notion, I started by developing the entire admin
            section front-end using fake data by creating objects directly in React.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            🛠️ Back-End Development with MongoDB and Mongoose
          </Typography>
          <Typography variant="body1" paragraph>
            After completing the front-end, I tackled the back-end. This was my first time working
            with MongoDB and Mongoose; I had only done a small project with it back in school. I'm
            more familiar with Prisma and PostgreSQL, but I managed well and plan to continue using
            MongoDB in my future projects.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            ⚙️ State Management with MobX
          </Typography>
          <Typography variant="body1" paragraph>
            MobX was another new experience for me. I successfully integrated observers, and some
            data is handled in real-time. However, I couldn’t achieve real-time updates across
            multiple devices or tabs when data is modified. This is a feature I'd like to add in the
            future.
          </Typography>
          <Typography variant="body1" paragraph>
            On the other hand, every time I modify, create, or delete data on my page, I can see the
            changes in real-time without needing to reload the page.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            🔐 Authentication with NextAuth
          </Typography>
          <Typography variant="body1" paragraph>
            I then added a connection system using NextAuth, which I am familiar with. I followed
            this documentation to adapt it to MongoDB:
            <MuiLink
              href="https://www.mongodb.com/developer/languages/typescript/nextauthjs-authentication-mongodb/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold' }}
            >
              NextAuth.js with MongoDB
            </MuiLink>
            .
          </Typography>
          <Typography variant="body1" paragraph>
            No real complications arose; it was straightforward, and the documentation even explains
            how to encrypt passwords with bcryptjs, which was very cool.
          </Typography>
          <Typography variant="body1" paragraph>
            I didn’t add GitHub or other OAuth connections; I kept it simple, but I could have done
            it easily with NextAuth.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            💅 Styling and User Interface
          </Typography>
          <Typography variant="body1" paragraph>
            I then maximized the styling of my application. I created a user-facing front-end with a
            search function for attorneys where all data is counted, and in the pricing grid, we can
            also search by court, county, or violation.
          </Typography>
          <Typography variant="body1" paragraph>
            This part is accessible to non-logged-in users. To access the admin area and modify
            attorney details or pricing grids, you need to log in. You can also create an account on&nbsp;
            <Link href="/register">localhost:3000/register</Link>.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            🦶 Footer Creation
          </Typography>
          <Typography variant="body1" paragraph>
            I quickly created a small footer using Material-UI.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            🎉 Conclusion
          </Typography>
          <Typography variant="body1" paragraph>
            I am very happy to have completed this project. I enjoyed working on it a lot—I love
            Next.js and React; they are my favorite technologies, and I hope to have the opportunity
            to work on other projects with you using these technologies! 😊
          </Typography>
          <Typography variant="body1" paragraph>
            This project has further motivated me to embark on this journey with you!
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for the opportunity to apply with you.
          </Typography>
          <br />
          <Box display="flex" alignItems="center">
            <Avatar alt="Théo Garcia" src="/theo.jpeg" sx={{ width: 40, height: 40, mr: 2 }} />
            <Typography variant="body1">
              Théo Garcia
            </Typography>
            <Box sx={{ ml: 2 }}>
            <IconButton
                component={MuiLink}
                href="https://www.linkedin.com/in/garciatheo38/"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component={MuiLink}
                href="https://github.com/DevForZiema"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component={MuiLink}
                href="https://www.ziema.fr"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <WebIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>


        
      </Paper>
    </Container>
  )
}

export default Documentation
