import { Box, Container,Typography } from '@mui/material'
import './App.css'
import AddHabitForm from './Components/add-habit-form'
import HabitList from './Components/habit-list'

function App() {


  return (
    <>
     <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker 
        </Typography>
       <AddHabitForm/>
       <HabitList/>
       
      </Box>
      </Container> 
    </>
  )
}

export default App
