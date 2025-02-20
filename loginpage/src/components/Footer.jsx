import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} My React App. All rights reserved.
      </Typography>
    </Box>
  );
}
