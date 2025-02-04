import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { CSVLink } from "react-csv";

const GetAllUsers = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers) || [];

  useEffect(() => {
    // Filter out admins and apply search filter
    const filtered = customerState
      .filter((user) => user.role !== "admin")
      .filter((user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
      .map((user, index) => ({
        id: index + 1,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        mobile: user.mobile,
      }));

    setFilteredData(filtered);
  }, [customerState, search]);

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "SNo", width: 90 },
    { field: "name", headerName: "Name", width: 200, sortable: true },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile", headerName: "Mobile", width: 150 },
  ];

  // Function to handle print
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

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold mb-4">Customers</h3>

      {/* Search Filter */}
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="py-3">
        {/* Export CSV Button */}
      <CSVLink
        data={filteredData}
        filename="customers.csv"
        className="mb-4"
      >
        <Button variant="contained" color="primary" className="!mr-4">
          Export CSV
        </Button>
      </CSVLink>

      {/* Print Button */}
      <Button variant="contained" color="secondary" onClick={handlePrint}>
        Print
      </Button>
      </div>

      {/* DataGrid Table */}
      <div className="mt-4" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          
        />

      </div>
    </div>
  );
};

export default GetAllUsers;
