import { create } from 'zustand';

interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabitState>((set) => ({
  habits: [],

  addHabit: (name, frequency) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: Date.now().toString(),
          name,
          frequency,
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),

  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: alreadyCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      }),
    })),
}));

export default useHabitStore;
