import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import useHabitStore from '../store/store';
import { useMemo } from 'react';

const HabitStatistics = () => {
  const { habits } = useHabitStore();

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const stats = useMemo(() => {
    let completedToday = 0;
    let longestStreak = 0;

    habits.forEach((habit) => {
      if (habit.completedDates.includes(today)) {
        completedToday++;
      }

      // Basic longest streak: just count total unique days for now
      const streak = new Set(habit.completedDates).size;
      if (streak > longestStreak) {
        longestStreak = streak;
      }
    });

    return {
      total: habits.length,
      completedToday,
      longestStreak,
    };
  }, [habits, today]);

  return (
    <Box mt={4}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6">Total Habits</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6">Completed Today</Typography>
              <Typography variant="h4">{stats.completedToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6">Longest Streak</Typography>
              <Typography variant="h4">{stats.longestStreak}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitStatistics;
