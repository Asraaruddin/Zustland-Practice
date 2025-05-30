import { Box, Paper, Grid, Typography, Button,LinearProgress } from "@mui/material";
import useHabitStore from "../store/store";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit:Habit)=>{
    let streak = 0 ;
    const CurrentDate = new Date()
    while(true){
        const dateString = CurrentDate.toISOString().split("T")[0];
        if(habit.completedDates.includes(dateString)) {
            streak++;
            CurrentDate.setDate(CurrentDate.getDate() - 1);
        }
        else {
            break;
        }

    }
  }


  if (habits.length === 0) {
    return <Typography>No habits added yet.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={habit.completedDates.includes(today) ? "success" : "primary"}
                  startIcon={<CheckCircleIcon />}
                  onClick={() => toggleHabit(habit.id, today)}
                >
                  {habit.completedDates.includes(today) ? "Completed" : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeHabit(habit.id)}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{mt:2}}>
            <Typography>Current Streak : {getStreak(habit)}</Typography>
            <LinearProgress  variant="determinate" value={(getStreak(habit)/30)*100} />
            
            
            
             </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
