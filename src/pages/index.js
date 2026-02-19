import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Paper,
  TableContainer,
} from "@mui/material";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", email: "" });

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = (user = { name: "", email: "" }) => {
    setForm(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ id: null, name: "", email: "" });
  };

  const handleSave = async () => {
    await fetch("/api/users", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    handleClose();
    loadUsers();
  };

  const handleDelete = async (id) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadUsers();
  };

  return (
  <Container maxWidth="md" sx={{ mt: 6 }}>
    <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
      
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold">
          👤 User Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 3, px: 3 }}
          onClick={() => handleOpen()}
        >
          + Add User
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow
                key={u.id}
                hover
                sx={{
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#fafafa" }
                }}
              >
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(u)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

    {/* Dialog */}
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: 4, p: 1 }
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {form.id ? "✏️ Edit User" : "➕ Add User"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ pb: 2, pr: 3 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 3 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 3, px: 3 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
);

}
