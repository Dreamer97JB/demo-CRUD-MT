import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FacturaState {
    idfactura: number;
    cedula: string;
    valor: number;
    idpersona: number;
}

const initialState: FacturaState[] = [];

const facturaSlice = createSlice({
    name: 'factura',
    initialState,
    reducers: {
        setFacturas: (_state, action: PayloadAction<FacturaState[]>) => {
            return action.payload;
        },
        addFactura: (state, action: PayloadAction<FacturaState>) => {
            state.push(action.payload);
        },
        updateFactura: (state, action: PayloadAction<FacturaState>) => {
            const index = state.findIndex(f => f.idfactura === action.payload.idfactura);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteFactura: (state, action: PayloadAction<number>) => {
            return state.filter(f => f.idfactura !== action.payload);
        },
    },
});

export const { setFacturas, addFactura, updateFactura, deleteFactura } = facturaSlice.actions;
export default facturaSlice.reducer;
