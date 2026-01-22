interface QuestInfoProps {
  onClick: () => void;
}

// Creamy thocky mechanical keyboard sound
export const playKeyboardClick = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Deep thock - the main body of the keypress
  const thockOsc = audioContext.createOscillator();
  const thockGain = audioContext.createGain();
  const thockFilter = audioContext.createBiquadFilter();
  
  thockOsc.type = 'sine';
  thockFilter.type = 'lowpass';
  thockFilter.frequency.value = 300;
  thockFilter.Q.value = 2;
  
  thockOsc.connect(thockFilter);
  thockFilter.connect(thockGain);
  thockGain.connect(audioContext.destination);
  
  thockOsc.frequency.setValueAtTime(180, audioContext.currentTime);
  thockOsc.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.08);
  
  thockGain.gain.setValueAtTime(0.25, audioContext.currentTime);
  thockGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
  
  thockOsc.start(audioContext.currentTime);
  thockOsc.stop(audioContext.currentTime + 0.12);
  
  // Soft clack - the initial contact
  const clackOsc = audioContext.createOscillator();
  const clackGain = audioContext.createGain();
  const clackFilter = audioContext.createBiquadFilter();
  
  clackOsc.type = 'triangle';
  clackFilter.type = 'bandpass';
  clackFilter.frequency.value = 800;
  clackFilter.Q.value = 1;
  
  clackOsc.connect(clackFilter);
  clackFilter.connect(clackGain);
  clackGain.connect(audioContext.destination);
  
  clackOsc.frequency.setValueAtTime(600, audioContext.currentTime);
  clackOsc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.03);
  
  clackGain.gain.setValueAtTime(0.08, audioContext.currentTime);
  clackGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
  
  clackOsc.start(audioContext.currentTime);
  clackOsc.stop(audioContext.currentTime + 0.05);

  // Subtle resonance - the creamy sustain
  const resOsc = audioContext.createOscillator();
  const resGain = audioContext.createGain();
  
  resOsc.type = 'sine';
  resOsc.connect(resGain);
  resGain.connect(audioContext.destination);
  
  resOsc.frequency.setValueAtTime(120, audioContext.currentTime + 0.02);
  resOsc.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.15);
  
  resGain.gain.setValueAtTime(0.06, audioContext.currentTime + 0.02);
  resGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
  
  resOsc.start(audioContext.currentTime + 0.02);
  resOsc.stop(audioContext.currentTime + 0.18);
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
