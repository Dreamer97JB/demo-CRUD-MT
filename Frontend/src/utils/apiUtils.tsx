export const API_BASE_URL = 'http://localhost:8080/api';

export const ENDPOINTS = {
    GET_FACTURAS: `${API_BASE_URL}/facturas/all`,
    GET_PERSONAS: `${API_BASE_URL}/personas/all`,
    CREATE_PERSONA: `${API_BASE_URL}/personas/create`,
    UPDATE_PERSONA: (id: number) => `${API_BASE_URL}/personas/update/${id}`,
    DELETE_PERSONA: (id: number) => `${API_BASE_URL}/personas/delete/${id}`,
    CREATE_FACTURA: `${API_BASE_URL}/facturas/create`,
};

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
    persona: {
        idpersona: number;
    };
}

export const fetchFacturas = async () => {
    const response = await fetch(ENDPOINTS.GET_FACTURAS);
    if (!response.ok) {
        throw new Error('Failed to fetch facturas');
    }
    return response.json();
};


export const fetchPersonas = async () => {
    const response = await fetch(ENDPOINTS.GET_PERSONAS);
    if (!response.ok) {
        throw new Error('Failed to fetch personas');
    }
    return response.json();
};

export const createPersona = async (persona: Partial<Persona>) => {
    const response = await fetch(ENDPOINTS.CREATE_PERSONA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona),
    });
    if (!response.ok) {
        throw new Error('Failed to create persona');
    }
    return response.json();
};

export const updatePersona = async (id: number, persona: Partial<Persona>) => {
    const response = await fetch(ENDPOINTS.UPDATE_PERSONA(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona),
    });
    if (!response.ok) {
        throw new Error('Failed to update persona');
    }
    return response.json();
};

export const deletePersona = async (id: number) => {
    const response = await fetch(ENDPOINTS.DELETE_PERSONA(id), {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete persona');
    }
};

export const createFactura = async (factura: Partial<Factura>) => {
    const response = await fetch(ENDPOINTS.CREATE_FACTURA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura),
    });
    if (!response.ok) {
        throw new Error('Failed to create factura');
    }
    return response.json();
};