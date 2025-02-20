import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerManagement() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Fetch Customers (GET Request)
  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.data || []);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Add New Customer (POST Request)
  const handleAddCustomer = async () => {
    if (!firstName || !lastName || !email) {
      toast.error("All fields are required!");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      await response.json();
      setCustomerList((prev) => [...prev, newCustomer]);
      setFirstName("");
      setLastName("");
      setEmail("");

      toast.success("Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer!");
    }
  };

  // Open Delete Confirmation Dialog
  const handleOpenDeleteDialog = (id) => {
    setSelectedCustomerId(id);
    setOpenDialog(true);
  };

  // Close Delete Dialog
  const handleCloseDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedCustomerId(null);
  };

  // Delete Customer (DELETE Request)
  const handleDeleteConfirmed = async () => {
    if (!selectedCustomerId) return;

    try {
      await fetch(`https://reqres.in/api/users/${selectedCustomerId}`, {
        method: "DELETE",
      });

      setCustomerList(customerList.filter((customer) => customer.id !== selectedCustomerId));
      toast.success("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer!");
    }

    handleCloseDeleteDialog();
  };

  // Open Edit Dialog
  const handleOpenEditDialog = (customer) => {
    setSelectedCustomerId(customer.id);
    setEditFirstName(customer.first_name);
    setEditLastName(customer.last_name);
    setEditEmail(customer.email);
    setOpenEditDialog(true);
  };

  // Close Edit Dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCustomerId(null);
  };

  // Update Customer (PUT Request)
  const handleUpdateCustomer = async () => {
    if (!editFirstName || !editLastName || !editEmail) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await fetch(`https://reqres.in/api/users/${selectedCustomerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: editFirstName,
          last_name: editLastName,
          email: editEmail,
        }),
      });

      setCustomerList(
        customerList.map((customer) =>
          customer.id === selectedCustomerId
            ? { ...customer, first_name: editFirstName, last_name: editLastName, email: editEmail }
            : customer
        )
      );

      toast.success("Customer updated successfully!");
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer!");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Grid container spacing={2} justifyContent="center">
        {/* Customer Login Form */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}> {/* Increased width */}
            <Typography variant="h5" align="center">Customer Management</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAddCustomer}>
              Add Customer
            </Button>
          </Card>
        </Grid>

        {/* Customer List */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5">Customer List</Typography>
            <Box sx={{ maxHeight: 300, overflowY: "auto", p: 1 }}>
              {customerList.length === 0 ? (
                <Typography>No customers found.</Typography>
              ) : (
                customerList.map((customer) => (
                  <Grid container key={customer.id} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>
                      {customer.first_name} {customer.last_name} - {customer.email}
                    </Typography>
                    <Box>
                      <Tooltip title="Edit Customer">
                        <IconButton color="primary" size="small" onClick={() => handleOpenEditDialog(customer)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Customer">
                        <IconButton color="error" size="small" onClick={() => handleOpenDeleteDialog(customer.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                ))
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this customer?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="First Name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
          <TextField fullWidth margin="normal" label="Last Name" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
          <TextField fullWidth margin="normal" label="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
          <Button onClick={handleUpdateCustomer} color="success">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerManagement;
