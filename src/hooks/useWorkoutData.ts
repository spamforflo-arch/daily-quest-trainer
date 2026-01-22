import { useState, useEffect } from "react";
import { format } from "date-fns";

interface DayData {
  stretching: boolean;
  workoutA: boolean;
  workoutB: boolean;
  walking: boolean;
  walkingDuration: number;
}

interface WorkoutHistory {
  [date: string]: DayData;
}

const DEFAULT_DAY: DayData = {
  stretching: false,
  workoutA: false,
  workoutB: false,
  walking: false,
  walkingDuration: 30,
};

export const useWorkoutData = () => {
  const [history, setHistory] = useState<WorkoutHistory>(() => {
    const saved = localStorage.getItem("workout-history");
    return saved ? JSON.parse(saved) : {};
  });

  const today = format(new Date(), "yyyy-MM-dd");

  const todayData: DayData = history[today] || { ...DEFAULT_DAY };

  useEffect(() => {
    localStorage.setItem("workout-history", JSON.stringify(history));
  }, [history]);

  const toggleWorkout = (workout: keyof Pick<DayData, 'stretching' | 'workoutA' | 'workoutB' | 'walking'>) => {
    setHistory(prev => ({
      ...prev,
      [today]: {
        ...DEFAULT_DAY,
        ...prev[today],
        [workout]: !(prev[today]?.[workout] ?? false),
      },
    }));
  };

  const setWalkingDuration = (duration: number) => {
    setHistory(prev => ({
      ...prev,
      [today]: {
        ...DEFAULT_DAY,
        ...prev[today],
        walkingDuration: duration,
      },
    }));
  };

  const getCompletedDays = () => {
    return Object.entries(history).map(([date, data]) => ({
      date,
      workouts: Object.entries(data)
        .filter(([key, value]) => key !== 'walkingDuration' && value === true)
        .map(([key]) => key),
    }));
  };

  return {
    todayData,
    toggleWorkout,
    setWalkingDuration,
    getCompletedDays,
  };
};
