import React from 'react';
import { Container, Typography } from '@mui/material';
import TabsComponent from './TabsComponent';

const MainLayout: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Demo - Metropolitan Touring
            </Typography>
            <TabsComponent />
        </Container>
    );
};

export default MainLayout;
