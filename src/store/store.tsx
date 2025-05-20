import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  fetchHabits: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      isLoading: false,
      error: null,

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

      fetchHabits: async () => {
        set({ isLoading: true, error: null });

        try {
          const currentHabits = get().habits;
          if (currentHabits.length > 0) {
            set({ isLoading: false });
            return;
          }

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Simulated mock habits
          const mockHabits: Habit[] = [
            {
              id: '1',
              name: 'Exercise',
              frequency: 'daily',
              completedDates: [],
              createdAt: new Date().toISOString(),
            },
            {
              id: '2',
              name: 'Read Book',
              frequency: 'weekly',
              completedDates: [],
              createdAt: new Date().toISOString(),
            },
          ];

          set({
            habits: mockHabits,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch habits",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'habit-storage', // localStorage key
    }
  )
);

export default useHabitStore;
