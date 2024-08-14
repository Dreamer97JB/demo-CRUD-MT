import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchFacturas } from '../utils/apiUtils';

interface Persona {
    idpersona: number;
    nombre: string;
    edad: number;
    nacimiento: string;
}

interface Factura {
    idfactura: number;
    cedula: string;
    valor: number;
    persona: Persona;
}

const columns: GridColDef[] = [
    // { field: 'idfactura', headerName: 'ID Factura', width: 150 },
    { field: 'cedula', headerName: 'Cédula', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 150 },
    { field: 'nombreCliente', headerName: 'Nombre Cliente', width: 400 },
];

const FacturasTab: React.FC = () => {
    const [_facturas, setFacturas] = useState<Factura[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFacturas = async () => {
            try {
                const data = await fetchFacturas();
                setFacturas(data);

                // Mapear datos para el DataGrid
                const mappedRows = data.map((factura: Factura) => ({
                    idfactura: factura.idfactura,
                    cedula: factura.cedula,
                    valor: `$${factura.valor.toFixed(2)}`,
                    nombreCliente: factura.persona.nombre,
                    id: factura.idfactura,
                }));
                setRows(mappedRows);
            } catch (err) {
                setError('Error loading facturas');
            }
        };

        loadFacturas();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            {error ? (
                <p>{error}</p>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            )}
        </div>
    );
};

export default FacturasTab;
