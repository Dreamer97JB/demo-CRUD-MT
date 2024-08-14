import { configureStore } from '@reduxjs/toolkit';
import personaReducer from '../features/persona/personaSlice';
import facturaReducer from '../features/factura/facturaSlice';

export const store = configureStore({
    reducer: {
        persona: personaReducer,
        factura: facturaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
