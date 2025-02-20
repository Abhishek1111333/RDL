import React from "react";
import { Container, Typography, Box, Grid, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0D47A1",
        color: "white",
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Company Info */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              My Company
            </Typography>
            <Typography variant="body2">
              Building innovative solutions for a better future.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Services
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Contact
            </Link>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <IconButton href="#" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="#" color="inherit">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3, opacity: 0.8 }}>
          © {new Date().getFullYear()} My Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
