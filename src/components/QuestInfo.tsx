import { AlertCircle } from "lucide-react";

interface QuestInfoProps {
  onClick: () => void;
}

const QuestInfo = ({ onClick }: QuestInfoProps) => {
  const playClickSound = () => {
    // Create satisfying click sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Main pop sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);

    // Secondary soft click
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.frequency.setValueAtTime(1200, audioContext.currentTime + 0.02);
    oscillator2.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.08);
    
    gainNode2.gain.setValueAtTime(0.15, audioContext.currentTime + 0.02);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator2.start(audioContext.currentTime + 0.02);
    oscillator2.stop(audioContext.currentTime + 0.1);
  };

  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className="quest-card flex items-center gap-3 animate-glow"
    >
      <div className="w-8 h-8 rounded-full border-2 border-foreground/70 flex items-center justify-center">
        <span className="text-lg font-bold">!</span>
      </div>
      <span className="text-sm font-semibold tracking-wide">QUEST INFO</span>
    </button>
  );
};

export default QuestInfo;
