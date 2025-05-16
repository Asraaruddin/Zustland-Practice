import { useState } from "react";
import type { ChangeEvent } from "react"; // ✅ type-only import
import { Box, TextField,Button } from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"
import useHabitStore from "../store/store";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const {habits,addHabit} = useHabitStore()
  console.log(habits);

  const handleSubmit =(e:React.FormEvent)=>{
    e.preventDefault();
    if(name.trim()){
        addHabit(name,frequency);
        setName("");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{
        display:'flex',
        flexDirection:"column",
        gap:2,
      }}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter habit name"
          fullWidth
          required
        />
        <FormControl fullWidth>
  <InputLabel>Frequency</InputLabel>
  <Select
    value={frequency}
    label="Frequency"
    onChange={(e)=>setFrequency(e.target.value as "daily"|"weekly")}
  >
    <MenuItem value="daily">Daily</MenuItem>
    <MenuItem value="weekly">Weekly</MenuItem>
  </Select>
</FormControl>
<Button type="submit" variant="contained" color="primary">
Add Habit
</Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
