import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { fetchPersonas, createPersona, updatePersona, deletePersona, createFactura } from '../utils/apiUtils';

interface Persona {
    idpersona: number;
    nombre: string;
    edad: number;
    nacimiento: string;
}

const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'nacimiento', headerName: 'Fecha de Nacimiento', width: 200 },
];

const PersonasTab: React.FC = () => {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const [open, setOpen] = useState(false);
    const [openFactura, setOpenFactura] = useState(false);
    const [cedula, setCedula] = useState('');
    const [formValues, setFormValues] = useState<Partial<Persona>>({ nombre: '', edad: undefined, nacimiento: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadPersonas = async () => {
            try {
                const data = await fetchPersonas();
                setPersonas(data);

                const mappedRows = data.map((persona: Persona) => ({
                    id: persona.idpersona,
                    nombre: persona.nombre,
                    edad: persona.edad,
                    nacimiento: persona.nacimiento,
                }));
                setRows(mappedRows);
            } catch (err) {
                setError('Error loading personas');
            }
        };

        loadPersonas();
    }, []);

    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        setSelectionModel(newSelection);
    };

    const handleOpenDialog = () => {
        setIsEditing(false);
        setFormValues({ nombre: '', edad: undefined, nacimiento: '' });
        setOpen(true);
    };

    const handleEditDialog = () => {
        if (selectionModel.length > 0) {
            const selectedPersona = personas.find(p => p.idpersona === selectionModel[0]);
            if (selectedPersona) {
                setIsEditing(true);
                setFormValues(selectedPersona);
                setOpen(true);
            }
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (isEditing && formValues.idpersona) {
            await updatePersona(formValues.idpersona, formValues);
        } else {
            await createPersona(formValues);
        }
        setOpen(false);
        window.location.reload(); // Recargar la página para ver los cambios
    };

    const handleDelete = async () => {
        if (selectionModel.length > 0) {
            await deletePersona(selectionModel[0] as number);
            window.location.reload(); // Recargar la página para ver los cambios
        }
    };

    const handleOpenFacturaDialog = () => {
        setCedula('');
        setOpenFactura(true);
    };

    const handleCloseFacturaDialog = () => {
        setOpenFactura(false);
    };

    const handleCreateFacturaConfirm = async () => {
        if (selectionModel.length > 0) {
            await createFactura({
                persona: {
                    idpersona: selectionModel[0] as number
                },
                cedula: cedula,
                valor: 0
            });
            setOpenFactura(false);
            window.location.reload(); // Recargar la página para ver los cambios
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Crear Persona
                </Button>
                <Button variant="contained" color="secondary" onClick={handleEditDialog} disabled={selectionModel.length === 0}>
                    Editar Persona
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete} disabled={selectionModel.length === 0}>
                    Eliminar Persona
                </Button>
                <Button variant="contained" color="primary" onClick={handleOpenFacturaDialog} disabled={selectionModel.length === 0}>
                    Crear Factura
                </Button>
            </div>

            {error ? (
                <p>{error}</p>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={handleSelectionChange}
                    getRowId={(row) => row.id}
                />
            )}

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Editar Persona' : 'Crear Persona'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        value={formValues.nombre}
                        onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Edad"
                        fullWidth
                        type="number"
                        value={formValues.edad}
                        onChange={(e) => setFormValues({ ...formValues, edad: parseInt(e.target.value, 10) })}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha de Nacimiento"
                        fullWidth
                        type="date"
                        value={formValues.nacimiento}
                        onChange={(e) => setFormValues({ ...formValues, nacimiento: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openFactura} onClose={handleCloseFacturaDialog}>
                <DialogTitle>Crear Factura</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Cédula"
                        fullWidth
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFacturaDialog}>Cancelar</Button>
                    <Button onClick={handleCreateFacturaConfirm} color="primary">
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PersonasTab;
