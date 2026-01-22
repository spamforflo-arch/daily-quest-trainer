import { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface WorkoutItemProps {
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
  onLongPress?: () => void;
  showDuration?: boolean;
  duration?: number;
}

const WorkoutItem = ({ 
  name, 
  isCompleted, 
  onToggle, 
  onLongPress,
  showDuration,
  duration 
}: WorkoutItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleTouchStart = () => {
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 500);
      setLongPressTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  return (
    <div 
      className="workout-card flex items-center justify-between"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-foreground">{name}</span>
        {showDuration && duration && (
          <span className="text-sm text-muted-foreground mt-1">
            {duration} minutes • Tap & hold to change
          </span>
        )}
      </div>
      <div 
        className={`custom-checkbox flex items-center justify-center ${isCompleted ? 'checked' : ''} ${isAnimating ? 'animate-check' : ''}`}
      >
        {isCompleted && (
          <Check className="w-5 h-5 text-accent" strokeWidth={3} />
        )}
      </div>
    </div>
  );
};

export default WorkoutItem;
