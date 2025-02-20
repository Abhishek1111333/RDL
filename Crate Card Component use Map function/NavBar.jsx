import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";
import EmployeeIcon from "@mui/icons-material/Group";
import CustomerIcon from "@mui/icons-material/Person";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store
          </Typography>
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button component={Link} to="/store" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Store" />
            </ListItem>
            <ListItem button component={Link} to="/employee" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <EmployeeIcon />
              </ListItemIcon>
              <ListItemText primary="Employee" />
            </ListItem>
            <ListItem button component={Link} to="/customer" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <CustomerIcon />
              </ListItemIcon>
              <ListItemText primary="Customer" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavBar;
