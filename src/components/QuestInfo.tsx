interface QuestInfoProps {
  onClick: () => void;
}

// Clean mechanical keyboard thock
export const playKeyboardClick = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Single clean thock - like a quality mechanical switch
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 0.5;
  
  osc.type = 'sine';
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  
  // Quick frequency drop for that "thock"
  osc.frequency.setValueAtTime(200, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.05);
  
  // Fast attack, quick decay
  gain.gain.setValueAtTime(0, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.08);
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
