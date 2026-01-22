import { useState, useEffect } from "react";
import QuestInfo from "@/components/QuestInfo";
import WorkoutItem from "@/components/WorkoutItem";
import ProgressCalendar from "@/components/ProgressCalendar";
import WalkingModal from "@/components/WalkingModal";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { setupDailyNotification } from "@/services/notifications";

const Index = () => {
  // Setup notifications on mount
  useEffect(() => {
    setupDailyNotification();
  }, []);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWalkingModal, setShowWalkingModal] = useState(false);
  const [questMessage, setQuestMessage] = useState("[Daily Quest: Strength Training has arrived.]");
  
  const { todayData, toggleWorkout, setWalkingDuration, getCompletedDays } = useWorkoutData();

  const handleQuestClick = () => {
    // Cycle through motivational messages
    const messages = [
      "[Daily Quest: Strength Training has arrived.]",
      "[Quest Active: Complete your workout to level up!]",
      "[Remember: Every rep counts towards your goals.]",
      "[Today's Mission: Push your limits!]",
    ];
    const currentIndex = messages.indexOf(questMessage);
    const nextIndex = (currentIndex + 1) % messages.length;
    setQuestMessage(messages[nextIndex]);
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-8 max-w-md mx-auto">
      {/* Quest Info */}
      <div className="mb-4">
        <QuestInfo onClick={handleQuestClick} />
      </div>

      {/* Quest Message */}
      <p className="text-foreground/90 text-base mb-8 leading-relaxed">
        {questMessage}
      </p>

      {/* Goal Header */}
      <div className="text-center mb-8">
        <h1 className="goal-title">GOAL</h1>
        <div className="goal-underline" />
      </div>

      {/* Calendar Toggle */}
      <div className="flex justify-center mb-6">
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className="toggle-btn"
        >
          {showCalendar ? "Hide Progress Calendar" : "Show Progress Calendar"}
        </button>
      </div>

      {/* Progress Calendar */}
      {showCalendar && (
        <div className="mb-6">
          <ProgressCalendar completedDays={getCompletedDays()} />
        </div>
      )}

      {/* Workout Items */}
      <div className="space-y-4">
        <WorkoutItem
          name="Stretching"
          isCompleted={todayData.stretching}
          onToggle={() => toggleWorkout('stretching')}
        />
        <WorkoutItem
          name="Workout A"
          isCompleted={todayData.workoutA}
          onToggle={() => toggleWorkout('workoutA')}
        />
        <WorkoutItem
          name="Workout B"
          isCompleted={todayData.workoutB}
          onToggle={() => toggleWorkout('workoutB')}
        />
        <WorkoutItem
          name="Walking"
          isCompleted={todayData.walking}
          onToggle={() => toggleWorkout('walking')}
          onLongPress={() => setShowWalkingModal(true)}
          showDuration={true}
          duration={todayData.walkingDuration}
        />
      </div>

      {/* Walking Duration Modal */}
      <WalkingModal
        isOpen={showWalkingModal}
        onClose={() => setShowWalkingModal(false)}
        currentDuration={todayData.walkingDuration}
        onSave={setWalkingDuration}
      />
    </div>
  );
};

export default Index;
