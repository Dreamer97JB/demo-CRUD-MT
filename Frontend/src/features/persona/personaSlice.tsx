import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonaState {
    idpersona: number;
    nombre: string;
    edad: number;
    nacimiento: string;
}

const initialState: PersonaState[] = [];

const personaSlice = createSlice({
    name: 'persona',
    initialState,
    reducers: {
        setPersonas: (_state, action: PayloadAction<PersonaState[]>) => {
            return action.payload;
        },
        addPersona: (state, action: PayloadAction<PersonaState>) => {
            state.push(action.payload);
        },
        updatePersona: (state, action: PayloadAction<PersonaState>) => {
            const index = state.findIndex(p => p.idpersona === action.payload.idpersona);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deletePersona: (state, action: PayloadAction<number>) => {
            return state.filter(p => p.idpersona !== action.payload);
        },
    },
});

export const { setPersonas, addPersona, updatePersona, deletePersona } = personaSlice.actions;
export default personaSlice.reducer;
