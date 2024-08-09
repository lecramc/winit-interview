import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const drawerWidth = 240

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/login')
    })
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        {status === 'authenticated' ? (
          <>
            <Avatar
              alt={session.user.name}
              src={session.user.image}
              sx={{ width: 64, height: 64, mb: 2 }}
            />
            <Typography variant="h6">{session.user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {session.user.email}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </Box>
      <List>
        <ListItem button component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/attorneys-panel">
          <ListItemText primary="Admin" />
        </ListItem>
        <ListItem button component={Link} href="/readme">
          <ListItemText primary="Read Me" />
        </ListItem>
        {/* Ajoutez d'autres éléments de menu ici */}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Afficher l'AppBar seulement sur les écrans mobiles */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: { xs: 'block', sm: 'none' } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* La barre latérale pour les écrans mobiles */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* La barre latérale pour les écrans de taille moyenne et plus */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />{' '}
        {/* Place un espace pour le Toolbar sur mobile uniquement */}
        {children}
      </Box>
    </Box>
  )
}
