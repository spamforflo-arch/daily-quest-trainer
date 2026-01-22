interface QuestInfoProps {
  onClick: () => void;
}

// Keyboard-style click sound
export const playKeyboardClick = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Sharp attack click
  const clickOsc = audioContext.createOscillator();
  const clickGain = audioContext.createGain();
  const clickFilter = audioContext.createBiquadFilter();
  
  clickOsc.type = 'square';
  clickFilter.type = 'highpass';
  clickFilter.frequency.value = 1000;
  
  clickOsc.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(audioContext.destination);
  
  clickOsc.frequency.setValueAtTime(2000, audioContext.currentTime);
  clickOsc.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.02);
  
  clickGain.gain.setValueAtTime(0.15, audioContext.currentTime);
  clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
  
  clickOsc.start(audioContext.currentTime);
  clickOsc.stop(audioContext.currentTime + 0.05);
  
  // Subtle thock resonance
  const thockOsc = audioContext.createOscillator();
  const thockGain = audioContext.createGain();
  
  thockOsc.type = 'sine';
  thockOsc.connect(thockGain);
  thockGain.connect(audioContext.destination);
  
  thockOsc.frequency.setValueAtTime(400, audioContext.currentTime);
  thockOsc.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.03);
  
  thockGain.gain.setValueAtTime(0.08, audioContext.currentTime);
  thockGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);
  
  thockOsc.start(audioContext.currentTime);
  thockOsc.stop(audioContext.currentTime + 0.04);
};

const QuestInfo = ({ onClick }: QuestInfoProps) => {
  const handleClick = () => {
    playKeyboardClick();
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
