import { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import './App.css';
import AddHabitForm from './Components/add-habit-form';
import HabitList from './Components/habit-list';
import useHabitStore from './store/store';
import HabitStatistics from './Components/habits-stats';

function App() {
  const { fetchHabits } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStatistics />
      </Box>
    </Container>
  );
}

export default App;
