import type { Level } from '../data/levels';
import { Shield, Sparkles, Target, Wifi, Activity, Aperture } from 'lucide-react';

interface GameBoardProps {
  levels: Level[];
  currentLevelIndex: number;
  isCorrect: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ levels, currentLevelIndex, isCorrect }) => {
  const currentLevel = levels[currentLevelIndex];
  
  // Collect all types up to the current level. If the answer is correct, lock it in.
  const activeTypes = new Set(
    levels.slice(0, currentLevelIndex + (isCorrect ? 1 : 0)).map(l => l.visualData.type)
  );
  const pendingType = !isCorrect ? currentLevel.visualData.type : null;
  const hasType = (t: string) => activeTypes.has(t) || pendingType === t;
  const isTypeActive = (t: string) => activeTypes.has(t);

  // Collect active overlays
  const activeOverlays = new Set(
    levels.slice(0, currentLevelIndex + (isCorrect ? 1 : 0)).map(l => l.visualData.overlay).filter(Boolean)
  );
  const pendingOverlay = !isCorrect ? currentLevel.visualData.overlay : null;
  const hasOverlay = (o: string) => activeOverlays.has(o) || pendingOverlay === o;
  const isOverlayActive = (o: string) => activeOverlays.has(o);

  const isGameComplete = currentLevelIndex === levels.length - 1 && isCorrect;

  return (
    <div className="game-board">
      
      {/* Hyperdrive Effect (Level 22) */}
      {hasType('hyperdrive') && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(34, 211, 238, 0.1) 100%)', zIndex: 0, animation: isTypeActive('hyperdrive') ? 'pulse-glow 1s infinite' : 'none' }}>
           <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)', backgroundSize: '100px 100px', top: '-50%', left: '-50%', animation: 'spin-slow 5s linear infinite', opacity: isTypeActive('hyperdrive') ? 1 : 0.3 }}></div>
        </div>
      )}

      {/* Top Right System Status */}
      <div style={{ position: 'absolute', top: '40px', right: '40px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 50 }} className="backdrop-blur-md">
        <div style={{ 
          width: '10px', height: '10px', borderRadius: '50%', 
          backgroundColor: isCorrect ? 'var(--neon-green)' : 'var(--neon-red)',
          boxShadow: isCorrect ? '0 0 15px var(--neon-green)' : '0 0 10px var(--neon-red)',
          animation: isCorrect ? 'pulse-glow 2s infinite' : 'none'
        }} />
        <span style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--text-secondary)' }}>
          System: <span style={{ color: isCorrect ? 'var(--neon-green)' : 'var(--neon-red)' }}>{isCorrect ? 'ONLINE' : 'STANDBY'}</span>
        </span>
      </div>

      {/* Failsafe Warning (Level 24) */}
      {hasType('failsafe') && !isGameComplete && (
        <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 30, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--neon-red)', padding: '12px 24px', borderRadius: '8px', opacity: isTypeActive('failsafe') ? 1 : 0.3, animation: isTypeActive('failsafe') ? 'pulse-glow 1s infinite' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield color="var(--neon-red)" />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-red)', letterSpacing: '0.1em' }}>FAILSAFE {isTypeActive('failsafe') ? 'ARMED' : 'PENDING'}</span>
        </div>
      )}

      {/* Central View */}
      <div style={{ position: 'relative', width: '600px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-40px' }}>
        
        {/* Advanced Assembly Platform */}
        <div style={{ position: 'absolute', bottom: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          <div className="glow-border" style={{ 
            width: '550px', height: '220px', 
            borderBottom: '4px solid rgba(34, 211, 238, 0.4)', borderTop: '1px solid rgba(34, 211, 238, 0.1)',
            borderRadius: '50%', transform: 'rotateX(75deg)',
            background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
            boxShadow: '0 20px 50px rgba(34, 211, 238, 0.15)'
          }}></div>
          
          {/* Level 24 Failsafe Platform Ring */}
          {hasType('failsafe') && (
            <div style={{ position: 'absolute', inset: '10px', border: '4px solid var(--neon-red)', borderRadius: '50%', transform: 'rotateX(0deg)', opacity: isTypeActive('failsafe') ? 1 : 0.2, filter: isTypeActive('failsafe') ? 'drop-shadow(0 0 10px #ef4444)' : 'none' }}></div>
          )}

          <div style={{ width: '400px', height: '160px', border: '2px solid rgba(34, 211, 238, 0.2)', borderRadius: '50%', transform: 'rotateX(75deg) translateY(-60px)', position: 'absolute' }}></div>
        </div>

        {/* Shield Generator Dome (Level 21) */}
        {hasType('shield') && (
          <div style={{ position: 'absolute', bottom: '15%', width: '450px', height: '550px', background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 60%)', borderTop: '4px solid rgba(34,211,238,0.6)', borderRadius: '50% 50% 0 0', zIndex: 40, opacity: isTypeActive('shield') ? 1 : 0.2, transition: 'all 1s', filter: isTypeActive('shield') ? 'drop-shadow(0 0 30px rgba(34,211,238,0.5))' : 'none', pointerEvents: 'none' }}></div>
        )}

        {/* Overlay: Companion Drone (Level 18) */}
        {hasOverlay('drone') && (
          <div style={{ position: 'absolute', top: '20%', left: '15%', zIndex: 35, animation: 'float 3s ease-in-out infinite', opacity: isOverlayActive('drone') ? 1 : 0.3 }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--surface-color)', border: '2px solid var(--neon-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
               <Aperture size={20} color="var(--neon-blue)" style={{ animation: 'spin-slow 4s linear infinite' }} />
            </div>
          </div>
        )}

        {/* Overlay: Targeting System (Level 19) */}
        {hasOverlay('targeting') && (
          <div style={{ position: 'absolute', top: '35%', left: '20%', zIndex: 35, opacity: isOverlayActive('targeting') ? 1 : 0.2 }}>
            <Target size={40} color="var(--neon-red)" style={{ animation: 'spin-slow 6s linear infinite' }} />
          </div>
        )}

        {/* Overlay: Uplink (Level 12) */}
        {hasOverlay('uplink') && (
          <div style={{ position: 'absolute', top: '15%', right: '20%', zIndex: 35, opacity: isOverlayActive('uplink') ? 1 : 0.2 }}>
            <Wifi size={40} color="var(--neon-green)" style={{ animation: 'pulse-glow 2s infinite' }} />
          </div>
        )}

        {/* The Humanoid Robot */}
        <div style={{ zIndex: 10, position: 'relative', width: '200px', height: '380px', margin: '0 auto', transition: 'all 2s', animation: isGameComplete ? 'ascend 3s ease-out forwards' : 'none' }}>
          
          {/* Back Glow for Ascension (Level 25) */}
          {hasType('ascension') && (
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 0%, transparent 60%)', animation: 'pulse-glow 3s infinite', top: '-100px', left: '-200px', opacity: isTypeActive('ascension') ? 1 : 0, zIndex: -1, pointerEvents: 'none' }}></div>
          )}

          {/* Core Skeleton / Chassis (Level 1) */}
          {hasType('chassis') && (
            <div style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '140px', background: '#3f3f46', borderRadius: '10px', opacity: isTypeActive('chassis') ? 1 : 0.2, zIndex: 2 }}>
              <div style={{ position: 'absolute', top: '140px', left: '-15px', width: '70px', height: '30px', background: '#27272a', borderRadius: '10px' }}></div>
            </div>
          )}

          {/* Head Base (Level 9) */}
          {hasType('head') && (
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '65px', height: '85px', background: 'linear-gradient(145deg, #ffffff, #a1a1aa)', borderRadius: '35px', boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.3)', opacity: isTypeActive('head') ? 1 : 0.3, zIndex: 10, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Visor (Level 10) */}
          {hasType('visor') && (
            <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', width: '49px', height: '55px', background: 'linear-gradient(145deg, #18181b, #000)', borderRadius: '20px 20px 25px 25px', boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.2)', opacity: isTypeActive('visor') ? 1 : 0.3, zIndex: 11, transition: 'opacity 0.5s' }}>
              {/* Visor Glow (Level 20) */}
              {hasType('visor-glow') && (
                <>
                  <div style={{ position: 'absolute', top: '5px', left: '8px', width: '20px', height: '12px', background: 'linear-gradient(135deg, rgba(255,255,255,0.6), transparent)', borderRadius: '5px', transform: 'rotate(-10deg)', opacity: isTypeActive('visor-glow') ? 1 : 0.2 }}></div>
                  <div style={{ position: 'absolute', inset: 0, boxShadow: isTypeActive('visor-glow') ? '0 0 20px rgba(34,211,238,0.6)' : 'none', borderRadius: 'inherit', transition: 'all 1s' }}></div>
                </>
              )}
            </div>
          )}

          {/* Neck (Level 8) */}
          {hasType('neck') && (
            <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '25px', background: 'linear-gradient(90deg, #27272a, #3f3f46, #27272a)', borderRadius: '5px', zIndex: 5, boxShadow: 'inset 0 10px 10px rgba(0,0,0,0.8)', opacity: isTypeActive('neck') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Torso Base (Level 2) */}
          {hasType('torso') && (
            <div style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', width: '110px', height: '140px', background: 'linear-gradient(145deg, #71717a, #3f3f46)', borderRadius: '30px 30px 20px 20px', clipPath: 'polygon(15% 0, 85% 0, 100% 25%, 90% 100%, 10% 100%, 0 25%)', opacity: isTypeActive('torso') ? 1 : 0.3, zIndex: 7, transition: 'opacity 0.5s' }}>
              {/* Torso Armor Plates (Level 19) */}
              {hasType('armor-plates') && (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #ffffff, #d4d4d8, #a1a1aa)', boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.3), inset 10px 10px 20px rgba(255,255,255,0.8)', opacity: isTypeActive('armor-plates') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
                  <div style={{ position: 'absolute', top: '45px', left: '20px', right: '20px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)' }}></div>
                  <div style={{ position: 'absolute', top: '90px', left: '25px', right: '25px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)' }}></div>
                </div>
              )}
            </div>
          )}

          {/* Power Core (Level 3) */}
          {hasType('power-core') && (
             <div style={{ position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '30px', background: 'var(--neon-cyan)', boxShadow: isTypeActive('power-core') ? '0 0 15px var(--neon-cyan)' : 'none', opacity: isTypeActive('power-core') ? 1 : 0.2, zIndex: 9, transition: 'all 0.5s' }}></div>
          )}

          {/* Left Shoulder (Level 11) */}
          {hasType('shoulder-l') && (
            <div style={{ position: 'absolute', top: '105px', left: '20px', width: '40px', height: '55px', background: 'linear-gradient(145deg, #ffffff, #a1a1aa)', borderRadius: '25px', transform: 'rotate(20deg)', zIndex: 9, boxShadow: 'inset 5px 5px 15px rgba(255,255,255,0.9)', opacity: isTypeActive('shoulder-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Right Shoulder (Level 12) */}
          {hasType('shoulder-r') && (
            <div style={{ position: 'absolute', top: '105px', right: '20px', width: '40px', height: '55px', background: 'linear-gradient(145deg, #ffffff, #a1a1aa)', borderRadius: '25px', transform: 'rotate(-20deg)', zIndex: 9, boxShadow: 'inset -5px 5px 15px rgba(255,255,255,0.9)', opacity: isTypeActive('shoulder-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Left Arm (Level 13) */}
          {hasType('arm-l') && (
            <div style={{ position: 'absolute', top: '150px', left: '10px', width: '28px', height: '60px', background: 'linear-gradient(90deg, #ffffff, #a1a1aa)', borderRadius: '15px 15px 0 0', transform: 'rotate(12deg)', zIndex: 6, opacity: isTypeActive('arm-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-6px', left: '2px', right: '2px', height: '12px', background: '#27272a', borderRadius: '4px' }}></div>
              
              {/* Overlay: Laser (Level 4) */}
              {hasOverlay('laser') && (
                <div style={{ position: 'absolute', left: '-15px', top: '20px', width: '10px', height: '30px', background: '#3f3f46', borderRadius: '5px', transform: 'rotate(-90deg)', opacity: isOverlayActive('laser') ? 1 : 0.3 }}>
                  <div style={{ position: 'absolute', top: '-2px', left: '2px', right: '2px', height: '5px', background: 'var(--neon-red)', borderRadius: '2px', boxShadow: isOverlayActive('laser') ? '0 0 10px var(--neon-red)' : 'none' }}></div>
                </div>
              )}
            </div>
          )}

          {/* Right Arm (Level 14) */}
          {hasType('arm-r') && (
            <div style={{ position: 'absolute', top: '150px', right: '10px', width: '28px', height: '60px', background: 'linear-gradient(90deg, #ffffff, #a1a1aa)', borderRadius: '15px 15px 0 0', transform: 'rotate(-12deg)', zIndex: 6, opacity: isTypeActive('arm-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-6px', left: '2px', right: '2px', height: '12px', background: '#27272a', borderRadius: '4px' }}></div>
            </div>
          )}

          {/* Left Forearm (Level 15) */}
          {hasType('forearm-l') && (
            <div style={{ position: 'absolute', top: '210px', left: '-2px', width: '25px', height: '50px', background: 'linear-gradient(90deg, #d4d4d8, #71717a)', borderRadius: '0 0 10px 10px', transform: 'rotate(12deg)', zIndex: 6, opacity: isTypeActive('forearm-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Right Forearm (Level 16) */}
          {hasType('forearm-r') && (
            <div style={{ position: 'absolute', top: '210px', right: '-2px', width: '25px', height: '50px', background: 'linear-gradient(90deg, #d4d4d8, #71717a)', borderRadius: '0 0 10px 10px', transform: 'rotate(-12deg)', zIndex: 6, opacity: isTypeActive('forearm-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Left Hand (Level 17) */}
          {hasType('hand-l') && (
            <div style={{ position: 'absolute', top: '260px', left: '-10px', width: '20px', height: '25px', background: '#3f3f46', borderRadius: '50% 50% 10px 10px', transform: 'rotate(12deg)', zIndex: 6, opacity: isTypeActive('hand-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Right Hand (Level 18) */}
          {hasType('hand-r') && (
            <div style={{ position: 'absolute', top: '260px', right: '-10px', width: '20px', height: '25px', background: '#3f3f46', borderRadius: '50% 50% 10px 10px', transform: 'rotate(-12deg)', zIndex: 6, opacity: isTypeActive('hand-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
               {/* Overlay: Scanner (Level 11) */}
               {hasOverlay('scanner') && (
                 <div style={{ position: 'absolute', right: '-25px', top: '-10px', width: '30px', height: '30px', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid var(--neon-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isOverlayActive('scanner') ? 1 : 0.2 }}>
                   <Activity size={16} color="var(--neon-cyan)" />
                 </div>
               )}
            </div>
          )}

          {/* Pelvis Cover (Level 4 triggers leg, we will render pelvis wrapper if any leg is active) */}
          {(hasType('leg-l') || hasType('leg-r')) && (
             <div style={{ position: 'absolute', top: '235px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '45px', background: 'linear-gradient(145deg, #52525b, #27272a)', borderRadius: '15px 15px 25px 25px', zIndex: 7, boxShadow: 'inset 0 10px 15px rgba(0,0,0,0.6)', opacity: (isTypeActive('leg-l') || isTypeActive('leg-r')) ? 1 : 0.3, transition: 'opacity 0.5s' }}></div>
          )}

          {/* Left Leg Upper (Level 4) */}
          {hasType('leg-l') && (
            <div style={{ position: 'absolute', top: '265px', left: '50px', width: '38px', height: '70px', background: 'linear-gradient(90deg, #ffffff, #a1a1aa)', borderRadius: '20px 20px 0 0', zIndex: 6, opacity: isTypeActive('leg-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-8px', left: '4px', right: '4px', height: '16px', background: '#27272a', borderRadius: '6px' }}></div>
            </div>
          )}

          {/* Right Leg Upper (Level 5) */}
          {hasType('leg-r') && (
            <div style={{ position: 'absolute', top: '265px', right: '50px', width: '38px', height: '70px', background: 'linear-gradient(90deg, #ffffff, #a1a1aa)', borderRadius: '20px 20px 0 0', zIndex: 6, opacity: isTypeActive('leg-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-8px', left: '4px', right: '4px', height: '16px', background: '#27272a', borderRadius: '6px' }}></div>
            </div>
          )}

          {/* Left Foot/Shin (Level 6) */}
          {hasType('foot-l') && (
            <div style={{ position: 'absolute', top: '340px', left: '50px', width: '38px', height: '65px', background: 'linear-gradient(90deg, #d4d4d8, #71717a)', borderRadius: '0 0 15px 15px', zIndex: 6, opacity: isTypeActive('foot-l') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-5px', left: '-5px', width: '48px', height: '15px', background: '#3f3f46', borderRadius: '10px 10px 5px 5px' }}></div>
            </div>
          )}

          {/* Right Foot/Shin (Level 7) */}
          {hasType('foot-r') && (
            <div style={{ position: 'absolute', top: '340px', right: '50px', width: '38px', height: '65px', background: 'linear-gradient(90deg, #d4d4d8, #71717a)', borderRadius: '0 0 15px 15px', zIndex: 6, opacity: isTypeActive('foot-r') ? 1 : 0.3, transition: 'opacity 0.5s' }}>
              <div style={{ position: 'absolute', bottom: '-5px', left: '-5px', width: '48px', height: '15px', background: '#3f3f46', borderRadius: '10px 10px 5px 5px' }}></div>
              
              {/* Overlay: Manual Override Button (Level 6) */}
              {hasOverlay('button') && (
                 <div style={{ position: 'absolute', right: '-15px', top: '20px', width: '20px', height: '20px', background: '#27272a', borderRadius: '50%', border: '2px solid var(--neon-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isOverlayActive('button') ? 1 : 0.3, boxShadow: isOverlayActive('button') ? '0 0 10px var(--neon-orange)' : 'none' }}>
                   <div style={{ width: '8px', height: '8px', background: 'var(--neon-orange)', borderRadius: '50%' }}></div>
                 </div>
              )}
            </div>
          )}

        </div>

        {/* Level 23: Quantum Processor (Floating cubes around) */}
        {hasType('quantum') && (
           <>
             <Sparkles size={60} style={{ position: 'absolute', top: '100px', right: '80px', color: '#facc15', animation: 'spin-slow 4s linear infinite', opacity: isTypeActive('quantum') ? 1 : 0.2, filter: 'drop-shadow(0 0 10px #facc15)' }} />
             <Sparkles size={40} style={{ position: 'absolute', bottom: '150px', left: '80px', color: '#22d3ee', animation: 'spin-slow 3s linear infinite reverse', opacity: isTypeActive('quantum') ? 1 : 0.2, filter: 'drop-shadow(0 0 10px #22d3ee)' }} />
           </>
        )}

        {/* Level 25: Ascension Banner */}
        {hasType('ascension') && isTypeActive('ascension') && (
          <div style={{ position: 'absolute', bottom: '-30px', background: 'rgba(0,0,0,0.7)', padding: '15px 40px', borderRadius: '40px', border: '1px solid var(--neon-cyan)', backdropFilter: 'blur(10px)', boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)', zIndex: 100, animation: 'ascend 1s ease-out forwards' }}>
            <h2 className="font-display" style={{ color: 'var(--neon-cyan)', fontSize: '2.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 0 15px rgba(34,211,238,0.6)', margin: 0 }}>Humanoid Synthesized</h2>
            <p style={{ color: 'var(--text-primary)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: '5px 0 0 0' }}>React Mastery Achieved</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scan { 0% { transform: translateY(-50px); } 100% { transform: translateY(300px); } }
        @keyframes ascend {
          0% { transform: translateY(50px) scale(0.9); opacity: 0; filter: brightness(0.5); }
          50% { filter: brightness(1.5); }
          100% { transform: translateY(0) scale(1); opacity: 1; filter: brightness(1); }
        }
      `}</style>
    </div>
  );
};

export default GameBoard;
