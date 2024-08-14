import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PersonasTab from './PersonasTab';
import FacturasTab from './FacturasTab';

const TabsComponent: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Personas" />
                <Tab label="Facturas" />
            </Tabs>
            {value === 0 && <PersonasTab />}
            {value === 1 && <FacturasTab />}
        </Box>
    );
};

export default TabsComponent;
