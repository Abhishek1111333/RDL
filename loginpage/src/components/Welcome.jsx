import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function Welcome({ email }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {email}!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Here are some products from our store:
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center">
          Failed to load products. Please try again later.
        </Typography>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  mx: "auto",
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: "contain", p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleOpen(product)}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 4,
            boxShadow: 6,
            padding: 3,
            maxWidth: 400,
          },
        }}
      >
        {selectedProduct && (
          <Box sx={{ textAlign: "center" }}>
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              {selectedProduct.title}
            </DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                image={selectedProduct.image}
                alt={selectedProduct.title}
                sx={{
                  borderRadius: 2,
                  maxHeight: 200,
                  mb: 2,
                  objectFit: "contain",
                  p: 2,
                }}
              />
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                Price: ${selectedProduct.price.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
              <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ borderRadius: 2 }}>
                Close
              </Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                Confirm Purchase
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </Container>
  );
}

export default Welcome;
