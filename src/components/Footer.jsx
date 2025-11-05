import React from 'react'
import { Box, Container, Typography, Grid, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
    component="footer"
    sx={{
      backgroundColor: 'black',
      color: 'white',
      py: 4,
      mt: '20px',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Sección 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
           HT FILM
          </Typography>
          <Typography variant="body2">
            Tu plataforma para ver películas y series fácilmente.
          </Typography>
        </Grid>

      
       

        {/* Sección 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" color='warning' gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body2">Email: email@email.com</Typography>
          <Typography variant="body2">Tel: +54 11 1234-5678</Typography>
        </Grid>

        {/* Sección 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" color='warning' gutterBottom>
            Redes Sociales
          </Typography>
          <Link href="#" color="inherit" underline="hover" display="block">
            Facebook
          </Link>
          <Link href="#" color="inherit" underline="hover" display="block">
            Instagram
          </Link>
          <Link href="#" color="inherit" underline="hover" display="block">
            Twitter
          </Link>
        </Grid>
      </Grid>

      {/* Línea final */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} HT FILM. Todos los derechos reservados.
        </Typography>
      </Box>
    </Container>
  </Box>
  )
}
