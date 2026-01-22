import { useState } from "react";
import { X } from "lucide-react";

interface WalkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDuration: number;
  onSave: (duration: number) => void;
}

const WalkingModal = ({ isOpen, onClose, currentDuration, onSave }: WalkingModalProps) => {
  const [duration, setDuration] = useState(currentDuration);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(duration);
    onClose();
  };

  const presetDurations = [15, 30, 45, 60];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Walking Duration</h3>
          <button onClick={onClose} className="nav-btn w-8 h-8">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(Math.max(1, parseInt(e.target.value) || 0))}
            className="time-input"
            min="1"
            max="180"
          />
          <span className="text-lg text-muted-foreground">minutes</span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {presetDurations.map(preset => (
            <button
              key={preset}
              onClick={() => setDuration(preset)}
              className={`py-2 rounded-xl text-sm font-medium transition-all ${
                duration === preset 
                  ? 'bg-accent/30 text-accent-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-accent/20 border border-accent/40 text-foreground font-semibold transition-all active:scale-98"
        >
          Save Duration
        </button>
      </div>
    </div>
  );
};

export default WalkingModal;
