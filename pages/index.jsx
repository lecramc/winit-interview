import { Container, Typography, Paper, Box } from '@mui/material';
import AttorneyDisplay from '@/components/AttorneyDisplay';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
          Find a Attorney
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our lawyer search platform. Use the search function below to find a lawyer that meets your needs. You can search by name, email, or phone number. Click on &quot;View Pricing&quot; for more details about each lawyer&apos;s services and pricing.
        </Typography>
      </Paper>
      <AttorneyDisplay />
    </Container>
  );
}
