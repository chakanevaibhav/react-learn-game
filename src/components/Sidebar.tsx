import type { Level } from '../data/levels';
import { TerminalSquare, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { levels } from '../data/levels';

interface SidebarProps {
  level: Level;
  currentLevel: number;
  totalLevels: number;
  userInput: string;
  setUserInput: (input: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onLevelSelect: (index: number) => void;
  isCorrect: boolean;
  unlockedLevel: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  level, currentLevel, totalLevels, userInput, setUserInput, onNext, onPrev, onLevelSelect, isCorrect, unlockedLevel
}) => {
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'easy': return '#10b981';
      case 'medium': return '#facc15';
      case 'hard': return '#ef4444';
      default: return '#fff';
    }
  };

  return (
    <div className="sidebar p-8" style={{ padding: '2.5rem', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2rem' }}>
          <TerminalSquare className="text-cyan drop-shadow-md" size={36} />
          React<span className="text-cyan">Assembly</span>
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            backgroundColor: getDifficultyColor(level.difficulty),
            boxShadow: `0 0 15px ${getDifficultyColor(level.difficulty)}`
          }} />
          <span style={{ color: getDifficultyColor(level.difficulty), textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 700 }}>
            {level.difficulty}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={onPrev} disabled={currentLevel === 0} title="Previous Level" style={{ padding: '6px 10px', fontSize: '0.9rem' }}>
            <ChevronLeft size={16} />
          </button>
          <select 
            value={currentLevel}
            onChange={(e) => {
              const target = Number(e.target.value);
              if (target <= unlockedLevel) onLevelSelect(target);
            }}
            style={{ 
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', 
              padding: '8px', borderRadius: '6px', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {levels.map((l, idx) => (
              <option key={l.id} value={idx} disabled={idx > unlockedLevel}>
                {String(idx + 1).padStart(2, '0')}: {l.title} {idx > unlockedLevel ? '(LOCKED)' : ''}
              </option>
            ))}
          </select>
          <button onClick={onNext} disabled={currentLevel >= totalLevels - 1 || currentLevel >= unlockedLevel} title="Next Level" style={{ padding: '6px 10px', fontSize: '0.9rem', opacity: (currentLevel >= totalLevels - 1 || currentLevel >= unlockedLevel) ? 0.3 : 1, cursor: (currentLevel >= totalLevels - 1 || currentLevel >= unlockedLevel) ? 'not-allowed' : 'pointer' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '12px' }}>
        <h2 className="text-cyan font-display uppercase tracking-widest" style={{ marginBottom: '12px' }}>
          {level.title}
        </h2>
        <p className="text-muted" style={{ marginBottom: '32px', fontSize: '1.1rem' }}>{level.description}</p>
        
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--neon-cyan)', boxShadow: '0 0 10px var(--neon-cyan)' }} />
          <h3 className="text-muted font-display" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Directive</h3>
          <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: level.instructions.replace(/`([^`]+)`/g, '<span style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.95rem; background: rgba(0,0,0,0.5); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(34, 211, 238, 0.2)">$1</span>') }} />
        </div>

        <div className="code-block" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '16px', marginBottom: '8px' }}>
            <span className="token-punctuation" style={{ fontSize: '1.15rem' }}>{level.initialCodePre}</span>
            <input 
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="..."
              style={{
                width: '180px',
                fontSize: '1.15rem',
                borderColor: isCorrect ? 'var(--neon-green)' : undefined,
                boxShadow: isCorrect ? '0 0 15px rgba(16,185,129,0.3)' : undefined,
                color: isCorrect ? 'var(--neon-green)' : 'var(--neon-cyan)',
                backgroundColor: isCorrect ? 'rgba(16,185,129,0.1)' : undefined
              }}
              autoFocus
            />
            <span className="token-punctuation" style={{ fontSize: '1.15rem' }}>{level.initialCodePost}</span>
          </div>
        </div>

        {isCorrect && (
          <div className="animate-success" style={{ 
            marginTop: '40px', 
            padding: '24px', 
            background: 'linear-gradient(90deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', 
            border: '1px solid rgba(16,185,129,0.4)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            boxShadow: '0 10px 40px rgba(16,185,129,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: 'rgba(16,185,129,0.2)', padding: '12px', borderRadius: '50%', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                <CheckCircle2 className="text-green" size={32} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="text-green font-display uppercase tracking-widest" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Integration Complete</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(16,185,129,0.8)' }}>Proceed to next directive</span>
              </div>
            </div>
            <button className="primary" onClick={onNext} disabled={currentLevel >= totalLevels - 1} style={{ padding: '12px 28px', fontSize: '1.2rem' }}>
              PROCEED <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
