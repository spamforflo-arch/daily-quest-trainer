import { useState, useRef } from "react";
import { Check } from "lucide-react";

// Checkbox tick sound
const playTickSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Sharp tick
  const tickOsc = audioContext.createOscillator();
  const tickGain = audioContext.createGain();
  
  tickOsc.type = 'sine';
  tickOsc.connect(tickGain);
  tickGain.connect(audioContext.destination);
  
  tickOsc.frequency.setValueAtTime(1800, audioContext.currentTime);
  tickOsc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.04);
  
  tickGain.gain.setValueAtTime(0.12, audioContext.currentTime);
  tickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
  
  tickOsc.start(audioContext.currentTime);
  tickOsc.stop(audioContext.currentTime + 0.08);
  
  // Soft confirmation tone
  const confirmOsc = audioContext.createOscillator();
  const confirmGain = audioContext.createGain();
  
  confirmOsc.type = 'sine';
  confirmOsc.connect(confirmGain);
  confirmGain.connect(audioContext.destination);
  
  confirmOsc.frequency.setValueAtTime(600, audioContext.currentTime + 0.02);
  
  confirmGain.gain.setValueAtTime(0.06, audioContext.currentTime + 0.02);
  confirmGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
  
  confirmOsc.start(audioContext.currentTime + 0.02);
  confirmOsc.stop(audioContext.currentTime + 0.1);
};

interface WorkoutItemProps {
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
  onLongPress?: () => void;
}

const WorkoutItem = ({ 
  name, 
  isCompleted, 
  onToggle, 
  onLongPress,
}: WorkoutItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleClick = () => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    setIsAnimating(true);
    playTickSound();
    onToggle();
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleTouchStart = () => {
    isLongPress.current = false;
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress();
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
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
      <span className="text-xl font-semibold text-foreground">{name}</span>
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
