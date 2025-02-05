import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUsers, makeAdmin } from "../features/customers/customerSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { CSVLink } from "react-csv";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const GetAllUsers = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers);

  // Ensure customerState is always an array
  const customers = Array.isArray(customerState) ? customerState : [];

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return customers
      .filter((user) => user.role !== "admin") // Exclude admins from the list
      .filter((user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
      .map((user, index) => ({
        id: user._id,
        sno: index + 1,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        mobile: user.mobile,
      }));
  }, [customers, search]);

  const handleOpenDialog = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    if (selectedUser) {
      if (actionType === "delete") {
        dispatch(deleteUsers(selectedUser.id));
      } else if (actionType === "makeAdmin") {
        dispatch(makeAdmin(selectedUser.id));
      }
    }
    handleCloseDialog();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Doodle Ecom</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; } /* Highlight header */
          </style>
        </head>
        <body>
          <h2>Customer List</h2>
          <table>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
        .map(
          (user) => `
                    <tr>
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>${user.mobile}</td>
                    </tr>`
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const columns = [
    { field: "sno", headerName: "SNo", width: 90 },
    { field: "name", headerName: "Name", width: 200, sortable: true },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    {
      field: "makeAdmin",
      headerName: "Make Admin",
      width: 150,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleOpenDialog(params.row, "makeAdmin")}>
          <AdminPanelSettingsIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleOpenDialog(params.row, "delete")}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold mb-4">Customers</h3>
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="py-3">
        <CSVLink data={filteredData} filename="customers.csv" className="mb-4">
          <Button variant="contained" color="primary" className="!mr-4">
            Export CSV
          </Button>
        </CSVLink>
        <Button variant="contained" color="secondary" onClick={handlePrint}>Print</Button>
      </div>

      <div className="mt-4 customers-table" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {actionType === "delete" ? "Confirm Deletion" : "Confirm Make Admin"}
        </DialogTitle>
        <DialogContent>
          {actionType === "delete"
            ? `Are you sure you want to delete ${selectedUser?.name}?`
            : `Are you sure you want to make ${selectedUser?.name} an admin?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmAction} color="secondary" autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetAllUsers;
