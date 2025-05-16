import { create } from 'zustand';

// ✅ Define the Habit type
export interface Habit  {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
  createdAt: string;
};

// ✅ Define the shape of the Zustand store
interface HabitState {
  habits: Habit[];
  addHabit:(name: string, frequency:"daily" | "weekly") => void;
};

const useHabitStore = create<HabitState>()((set) => {
    return {
  habits:[],
  addHabit:(name,frequency)=>
    set((state)=>{
return {
    habits:[
        {
            id:"1",
            name:"Read",
            frequency:"daily",
            completedDates:[],
            createAt:new Date().toISOString(),
        }
    ]
}
  }),
    };
});

export default useHabitStore;
