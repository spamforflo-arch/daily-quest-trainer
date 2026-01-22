import { useState, useRef } from "react";
import { Check } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// Satisfying checkbox tick sound
const playTickSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Soft pop
  const popOsc = audioContext.createOscillator();
  const popGain = audioContext.createGain();
  const popFilter = audioContext.createBiquadFilter();
  
  popOsc.type = 'sine';
  popFilter.type = 'lowpass';
  popFilter.frequency.value = 600;
  
  popOsc.connect(popFilter);
  popFilter.connect(popGain);
  popGain.connect(audioContext.destination);
  
  popOsc.frequency.setValueAtTime(500, audioContext.currentTime);
  popOsc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.06);
  
  popGain.gain.setValueAtTime(0.15, audioContext.currentTime);
  popGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
  
  popOsc.start(audioContext.currentTime);
  popOsc.stop(audioContext.currentTime + 0.1);
  
  // Confirmation ding
  const dingOsc = audioContext.createOscillator();
  const dingGain = audioContext.createGain();
  
  dingOsc.type = 'sine';
  dingOsc.connect(dingGain);
  dingGain.connect(audioContext.destination);
  
  dingOsc.frequency.setValueAtTime(880, audioContext.currentTime + 0.02);
  dingOsc.frequency.setValueAtTime(1100, audioContext.currentTime + 0.04);
  
  dingGain.gain.setValueAtTime(0.08, audioContext.currentTime + 0.02);
  dingGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
  
  dingOsc.start(audioContext.currentTime + 0.02);
  dingOsc.stop(audioContext.currentTime + 0.15);
};

// Haptic feedback for native
const triggerHaptic = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (e) {
      console.log('Haptics not available');
    }
  }
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
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const handleToggle = () => {
    setIsAnimating(true);
    playTickSound();
    triggerHaptic();
    onToggle();
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isLongPress.current = false;
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        triggerHaptic();
        onLongPress();
      }, 500);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Cancel long press if user moves finger
    const moveThreshold = 10;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
    
    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // Only toggle if it wasn't a long press
    if (!isLongPress.current) {
      handleToggle();
    }
    
    // Prevent click event
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click for mouse users (not touch)
    if (e.detail > 0) {
      handleToggle();
    }
  };

  return (
    <div 
      className="workout-card flex items-center justify-between cursor-pointer"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
