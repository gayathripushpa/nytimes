import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem,Box } from '@mui/material';
import ArticleList from './components/articleList';

const App = () => {
    const [period, setPeriod] = useState(1); 

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Box m={2} p={2}>
            <Typography variant="h4" component="h1" gutterBottom>
                NY Times Most Popular Articles
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="period-select-label">Select Period</InputLabel>
                <Select
                    labelId="period-select-label"
                    value={period}
                    onChange={handlePeriodChange}
                >
                    <MenuItem value={1}>Last 1 Day</MenuItem>
                    <MenuItem value={7}>Last 7 Days</MenuItem>
                    <MenuItem value={30}>Last 30 Days</MenuItem> 
                </Select>
            </FormControl>
            <ArticleList period={period} />
            </Box>
        </Container>
    );
};

export default App;
