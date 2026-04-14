import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../../services/api";
import Toast from "../../components/ui/Toast";

export default function UserList() {
  const [rows, setRows] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setRows(res.data);
    } catch {
      showToast("Erro ao buscar usuários", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/users/${selectedUser.idusuarios}`, selectedUser);
      showToast("Usuário atualizado com sucesso");
      setOpenModal(false);
      fetchUsers();
    } catch {
      showToast("Erro ao atualizar usuário", "error");
    }
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/users/${userToDelete.idusuarios}`);
      showToast("Usuário deletado com sucesso");
      setOpenDeleteModal(false);
      fetchUsers();
    } catch {
      showToast("Erro ao deletar usuário", "error");
    }
  };

  const columns = [
    { field: "idusuarios", headerName: "ID", width: 90 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "login", headerName: "Login", flex: 1 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    {
      field: "ativo",
      headerName: "Ativo",
      flex: 1,
      renderCell: (params) => (params.value ? "Sim" : "Não"),
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Excluir">
            <IconButton
              color="error"
              onClick={() => handleOpenDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.idusuarios}
        />
      </div>

      {/* ✏️ Modal de edição */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Editar Usuário</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            fullWidth
            value={selectedUser?.nome || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, nome: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Login"
            fullWidth
            value={selectedUser?.login || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, login: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Senha"
            fullWidth
            value={selectedUser?.senha || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, senha: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleUpdate} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🗑️ Modal de confirmação DELETE */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <DialogTitle>Confirmar exclusão</DialogTitle>

        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o usuário{" "}
            <strong>{userToDelete?.nome}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔔 Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}