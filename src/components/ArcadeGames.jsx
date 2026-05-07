import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, Play, CheckCircle2, XCircle, ArrowLeft, RotateCcw, Clock, 
  ShieldAlert, Trophy, Terminal, Wifi, Link, Sparkles, Cloud, Activity, 
  HeartPulse, Shield, DollarSign, Lightbulb, Zap, Database, Server
} from 'lucide-react';

// Mapeo dinámico de íconos para usar desde la Base de Datos
const IconMap = { Wifi, Link, Sparkles, Cloud, Database, Server, BrainCircuit };

// Sistema de Sonido Dinámico Web Audio API
const playSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode); gainNode.connect(ctx.destination);

  if (type === 'success') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(440, ctx.currentTime); 
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); 
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
  } else if (type === 'error') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.4);
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  } else if (type === 'click') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1);
  } else if (type === 'damage') {
    osc.type = 'square'; osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(20, ctx.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
  }
};

// ==========================================
// 1. JUEGO DE MEMORIA (NODOS DE RED)
// ==========================================
export function MemoryGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [networkIntegrity, setNetworkIntegrity] = useState(100);

  useEffect(() => { setCards([...game.data].sort(() => Math.random() - 0.5)); }, [game]);

  const handleCardClick = (card) => {
    if (flippedIds.length === 2 || flippedIds.includes(card.id) || matchedIds.includes(card.id)) return;
    playSound('click');
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      const c1 = cards.find(c => c.id === newFlipped[0]);
      const c2 = cards.find(c => c.id === newFlipped[1]);
      if (c1.matchId === c2.id) {
        playSound('success'); setMatchedIds([...matchedIds, c1.id, c2.id]); setFlippedIds([]);
        if (matchedIds.length + 2 === cards.length) setTimeout(() => setIsFinished(true), 500);
      } else {
        playSound('error'); 
        setNetworkIntegrity(prev => Math.max(0, prev - 5)); // Penalización visual
        setTimeout(() => setFlippedIds([]), 1000);
      }
    }
  };

  if (isFinished) return <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} />;

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 bg-slate-900/80 p-4 rounded-xl border border-white/5">
           <Activity className="text-blue-500 w-6 h-6"/>
           <div className="flex-1">
             <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-400">Integridad de Nodos</span><span className={networkIntegrity > 50 ? 'text-green-400' : 'text-red-400'}>{networkIntegrity}%</span></div>
             <div className="h-2 bg-slate-950 rounded-full overflow-hidden"><div className={`h-full transition-all ${networkIntegrity > 50 ? 'bg-green-500' : 'bg-red-500'}`} style={{width: `${networkIntegrity}%`}}></div></div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(card => {
            const isFlipped = flippedIds.includes(card.id) || matchedIds.includes(card.id);
            const CardIcon = IconMap[card.icon] || Server;
            return (
              <div key={card.id} onClick={() => handleCardClick(card)} className={`relative aspect-[4/3] rounded-2xl cursor-pointer perspective-1000 transition-all ${matchedIds.includes(card.id) ? 'opacity-30 scale-95' : 'hover:scale-105'}`}>
                <div className={`w-full h-full absolute inset-0 preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className="absolute inset-0 backface-hidden bg-slate-800 rounded-2xl border-2 border-blue-500/20 flex items-center justify-center shadow-lg"><BrainCircuit className="w-12 h-12 text-blue-500/30" /></div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl border-2 border-blue-500 flex flex-col items-center justify-center p-3 text-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    <CardIcon className="w-8 h-8 text-blue-400 mb-2 opacity-50" />
                    <p className="text-xs font-bold text-white leading-tight">{card.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.perspective-1000{perspective:1000px}.preserve-3d{transform-style:preserve-3d}.backface-hidden{backface-visibility:hidden}.rotate-y-180{transform:rotateY(180deg)}`}} />
    </GameContainer>
  );
}

// ==========================================
// 2. TERMINAL HACKER (AHORCADO)
// ==========================================
export function HangmanGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const maxMistakes = 6;
  
  const currentLevel = game.data[currentWordIdx];
  const wordArr = currentLevel.word.split('');
  const isWon = wordArr.every(l => guessedLetters.includes(l));
  const isLost = mistakes >= maxMistakes;

  useEffect(() => {
    if (isWon) {
      playSound('success');
      if (currentWordIdx < game.data.length - 1) {
        setTimeout(() => { setCurrentWordIdx(prev => prev + 1); setGuessedLetters([]); setMistakes(0); }, 1500);
      } else { setTimeout(() => setIsFinished(true), 1000); }
    }
    if (isLost) playSound('damage');
  }, [isWon, isLost]);

  const guess = (letter) => {
    if (guessedLetters.includes(letter) || isWon || isLost) return;
    playSound('click');
    setGuessedLetters([...guessedLetters, letter]);
    if (!wordArr.includes(letter)) setMistakes(m => m + 1);
  };

  if (isFinished) return <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} />;

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-6">
        
        {/* HACKER TERMINAL UI */}
        <div className={`w-full bg-black p-6 rounded-xl border-2 font-mono relative overflow-hidden ${isLost ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 scanline"></div>
          <div className="flex items-center gap-2 mb-4 border-b border-green-500/30 pb-2">
            <Terminal className={isLost ? 'text-red-500' : 'text-green-500'} />
            <span className={isLost ? 'text-red-500' : 'text-green-500'}>root@server:~# ./decrypt_data.sh</span>
          </div>
          
          <p className="text-green-400 text-sm mb-6 opacity-80">-- INTERCEPTANDO PAQUETE DE DATOS: "{currentLevel.hint}"</p>
          
          <div className="flex justify-between items-center mb-2">
             <span className="text-red-500 text-xs font-bold tracking-widest">NIVEL DE ALERTA DEL FIREWALL</span>
             <span className="text-red-500 text-xs font-bold">{mistakes} / {maxMistakes} INTENTOS</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-8">
            <div className="bg-red-500 h-full transition-all" style={{width: `${(mistakes/maxMistakes)*100}%`}}></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {wordArr.map((letter, i) => (
              <div key={i} className={`w-10 h-14 sm:w-14 sm:h-16 border-b-4 flex items-center justify-center text-3xl font-black uppercase ${isLost ? 'border-red-500/50 text-red-500' : 'border-green-500/50 text-green-400'}`}>
                {guessedLetters.includes(letter) ? letter : isLost ? <span className="opacity-50">{letter}</span> : '_'}
              </div>
            ))}
          </div>

          {isWon && <p className="text-center text-green-400 font-bold mt-6 animate-pulse">ACCESO CONCEDIDO. DESCIFRANDO SIGUIENTE NODO...</p>}
          {isLost && <p className="text-center text-red-500 font-bold mt-6 animate-pulse">ACCESO DENEGADO. FIREWALL ACTIVADO.</p>}
        </div>

        {isLost ? (
          <button onClick={() => {setMistakes(0); setGuessedLetters([]);}} className="px-8 py-4 bg-red-900 text-white border border-red-500 rounded-xl font-bold flex items-center gap-2 hover:bg-red-800 transition-colors"><RotateCcw/> REBOOT SYSTEM</button>
        ) : (
          <div className="grid grid-cols-7 sm:grid-cols-9 gap-2 w-full mt-4 p-4 bg-slate-900 rounded-xl border border-white/5">
            {"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('').map(letter => (
              <button key={letter} disabled={guessedLetters.includes(letter)} onClick={() => guess(letter)} className={`p-3 rounded-lg font-bold text-sm sm:text-base transition-all ${guessedLetters.includes(letter) ? (wordArr.includes(letter) ? 'bg-green-900/50 text-green-500 border border-green-500/30' : 'bg-red-900/30 text-red-500 opacity-30') : 'bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-white/5'}`}>
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes scanline { 0% { transform: translateY(0); } 100% { transform: translateY(300px); } } .scanline { animation: scanline 3s linear infinite; }`}} />
    </GameContainer>
  );
}

// ==========================================
// 3. SOBRECARGA CRÍTICA (TIME ATTACK)
// ==========================================
export function TimeAttackGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [qIndex, setQIndex] = useState(0);
  const [serverHealth, setServerHealth] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && serverHealth > 0 && !isFinished) {
      interval = setInterval(() => setServerHealth(h => Math.max(0, h - 3)), 1000); // Pierde 3% por segundo
    } else if (serverHealth === 0) {
      playSound('damage'); setIsFinished(true); setIsActive(false); setGameWon(false);
    }
    return () => clearInterval(interval);
  }, [isActive, serverHealth, isFinished]);

  const handleAnswer = (option) => {
    if (option === game.data[qIndex].correct) { 
      playSound('success'); 
      setServerHealth(h => Math.min(100, h + 20)); // Acierto repara el servidor 20%
      if (qIndex < game.data.length - 1) setQIndex(q => q + 1);
      else { setIsFinished(true); setIsActive(false); setGameWon(true); }
    } else { 
      playSound('error'); 
      setServerHealth(h => Math.max(0, h - 15)); // Error daña el servidor 15%
    } 
  };

  if (isFinished) {
    return gameWon ? <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} /> : (
      <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
        <div className="text-center bg-red-950/50 p-10 rounded-3xl max-w-md mx-auto border border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse"/>
          <h2 className="text-3xl font-black text-white mb-2">¡Colapso del Núcleo!</h2>
          <p className="text-red-300 mb-8">La estabilidad del servidor llegó a 0%. Hemos perdido los datos.</p>
          <button onClick={()=>{setQIndex(0); setServerHealth(100); setIsFinished(false); setIsActive(true);}} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"><RotateCcw/> Reiniciar Simulador</button>
        </div>
      </GameContainer>
    );
  }

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      {!isActive ? (
         <div className="text-center bg-slate-900 p-10 rounded-3xl max-w-md mx-auto border border-blue-500/30">
           <Zap className="w-20 h-20 text-blue-500 mx-auto mb-4"/>
           <h2 className="text-2xl font-black text-white mb-2">Simulador de Estrés</h2>
           <p className="text-slate-400 mb-6">El servidor perderá estabilidad cada segundo. Responde rápido para estabilizarlo. Si llega a 0%, colapsará.</p>
           <button onClick={()=>{setIsActive(true); playSound('click');}} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Play/> Iniciar Secuencia</button>
         </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-red-500/5" style={{ opacity: serverHealth < 30 ? 1 : 0, transition: 'opacity 0.2s' }}></div>
             <div className="flex justify-between items-end mb-2 relative z-10">
               <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">Estabilidad del Servidor</span>
               <span className={`text-2xl font-black ${serverHealth < 30 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>{serverHealth}%</span>
             </div>
             <div className="h-4 bg-slate-950 rounded-full overflow-hidden relative z-10 border border-white/5">
                <div className={`h-full transition-all duration-300 ${serverHealth > 50 ? 'bg-green-500' : serverHealth > 25 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${serverHealth}%`}}></div>
             </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5">
            <span className="text-blue-400 text-sm font-bold block mb-4">Módulo {qIndex+1} de {game.data.length}</span>
            <h3 className="text-2xl font-bold text-white mb-8">{game.data[qIndex].question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.data[qIndex].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} className="p-5 text-left bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 font-bold rounded-xl transition-all border border-white/5 shadow-md active:scale-95">{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </GameContainer>
  );
}

// ==========================================
// 4. CLASIFICADOR (DATA PIPELINE)
// ==========================================
export function SortingGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [errors, setErrors] = useState(0);

  const currentItem = game.data.items[currentIndex];

  const handleSort = (category) => {
    if (category === currentItem.category) {
      playSound('success');
      if (currentIndex < game.data.items.length - 1) setCurrentIndex(i => i + 1);
      else setIsFinished(true);
    } else {
      playSound('error');
      setErrors(e => e + 1);
    }
  };

  if (errors >= 3) {
    return (
      <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
         <div className="text-center bg-slate-900 p-10 rounded-3xl max-w-md mx-auto border border-red-500/30">
          <Database className="w-20 h-20 text-red-500 mx-auto mb-4 opacity-50"/>
          <h2 className="text-2xl font-black text-white mb-2">Datos Corruptos</h2>
          <p className="text-slate-400 mb-6">Cometiste demasiados errores clasificando la información. La IA ha colapsado.</p>
          <button onClick={()=>{setCurrentIndex(0); setErrors(0);}} className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500"><RotateCcw className="inline mr-2"/> Limpiar Base de Datos</button>
        </div>
      </GameContainer>
    );
  }

  if (isFinished) return <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} />;

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8 bg-slate-900 p-4 rounded-xl border border-white/5">
           <span className="text-slate-400 font-bold">Lotes procesados: {currentIndex}/{game.data.items.length}</span>
           <div className="flex gap-2">
             {[...Array(3)].map((_, i) => <ShieldAlert key={i} className={`w-5 h-5 ${i < errors ? 'text-red-500' : 'text-slate-700'}`} />)}
           </div>
        </div>
        
        <div className="w-full bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl border border-indigo-500/30 flex flex-col items-center justify-center p-10 text-center shadow-2xl mb-12 min-h-[250px]">
          <Database className="w-12 h-12 text-indigo-400 mb-4 opacity-50" />
          <p className="text-2xl font-medium text-white">{currentItem.text}</p>
        </div>

        <div className="flex gap-4 w-full">
          <button onClick={() => handleSort(game.data.categories[0])} className="flex-1 p-6 bg-slate-800 hover:bg-slate-700 rounded-2xl border-b-4 border-blue-600 transition-transform active:scale-95 group">
             <span className="block text-xs text-slate-400 uppercase font-bold tracking-widest mb-2 group-hover:text-blue-300">Ruta A</span>
             <span className="block font-black text-white">{game.data.categories[0]}</span>
          </button>
          <button onClick={() => handleSort(game.data.categories[1])} className="flex-1 p-6 bg-slate-800 hover:bg-slate-700 rounded-2xl border-b-4 border-emerald-600 transition-transform active:scale-95 group">
             <span className="block text-xs text-slate-400 uppercase font-bold tracking-widest mb-2 group-hover:text-emerald-300">Ruta B</span>
             <span className="block font-black text-white">{game.data.categories[1]}</span>
          </button>
        </div>
      </div>
    </GameContainer>
  );
}

// ==========================================
// 5. INGENIERO DE PROMPTS (SCRAMBLE VISUAL)
// ==========================================
export function PromptGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => { setAvailableWords([...game.data.words].sort(() => Math.random() - 0.5)); }, [game]);

  const selectWord = (word, index) => {
    playSound('click');
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    setSelectedWords(prev => [...prev, word]);
  };

  const deselectWord = (word, index) => {
    playSound('click');
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const verify = () => {
    if (selectedWords.join(' ') === game.data.target) {
      playSound('success'); setIsFinished(true);
    } else {
      playSound('error');
      setAvailableWords([...game.data.words].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
    }
  };

  if (isFinished) return <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} />;

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      <div className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        
        <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-3xl w-full flex items-center gap-6 shadow-2xl">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
             <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 bg-slate-950 p-6 rounded-2xl border border-white/10 min-h-[120px] flex flex-wrap gap-3 content-start">
            {selectedWords.length === 0 && <span className="text-slate-600 font-mono italic">Esperando instrucción (Prompt)...</span>}
            {selectedWords.map((w, i) => (
               <button key={i} onClick={() => deselectWord(w, i)} className="px-5 py-2.5 bg-blue-500 text-white rounded-xl font-bold shadow hover:bg-blue-400 transition-colors animate-in zoom-in duration-200">{w}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 p-8 w-full max-w-3xl">
          {availableWords.map((w, i) => (
             <button key={i} onClick={() => selectWord(w, i)} className="px-6 py-3 bg-slate-800 text-slate-200 rounded-xl font-bold border-b-4 border-slate-700 hover:bg-slate-700 transition-all active:translate-y-1 active:border-b-0">{w}</button>
          ))}
        </div>

        <button onClick={verify} disabled={availableWords.length > 0} className="w-full max-w-md py-4 bg-green-600 hover:bg-green-500 text-white font-black text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/20">EJECUTAR PROMPT</button>
      </div>
    </GameContainer>
  );
}

// ==========================================
// 6. SIMULADOR DE CEO (GOBERNANZA - REIGNS STYLE)
// ==========================================
export function ScenarioGameView({ game, onBack, onComplete, isAlreadyCompleted, isPreviewMode }) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  
  // STATS (Inician en 50%)
  const [stats, setStats] = useState({ ethics: 50, budget: 50, tech: 50 });

  const handleChoice = (impacts, fback) => {
    // Aplicar impactos
    const newStats = {
      ethics: Math.min(100, Math.max(0, stats.ethics + impacts.ethics)),
      budget: Math.min(100, Math.max(0, stats.budget + impacts.budget)),
      tech: Math.min(100, Math.max(0, stats.tech + impacts.tech)),
    };
    setStats(newStats);

    // Verificar pérdida
    if (newStats.ethics <= 0 || newStats.budget <= 0 || newStats.tech <= 0) {
      playSound('damage'); setFeedback({ text: fback, fatal: true });
    } else {
      playSound('click'); setFeedback({ text: fback, fatal: false });
    }
  };

  const nextStep = () => {
    if (feedback.fatal) { setGameLost(true); return; }
    
    if (step < game.data.length - 1) { setStep(s => s + 1); setFeedback(null); }
    else { playSound('success'); setIsFinished(true); }
  };

  if (gameLost) {
    return (
      <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
        <div className="bg-red-950/50 p-10 rounded-3xl max-w-lg text-center border border-red-500/50">
           <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-4" />
           <h2 className="text-3xl font-black text-white mb-2">¡Despedido!</h2>
           <p className="text-slate-400 mb-6">Uno de tus recursos clave llegó a cero. Llevaste a la empresa a la ruina.</p>
           <button onClick={() => {setStats({ethics: 50, budget: 50, tech: 50}); setStep(0); setFeedback(null); setGameLost(false);}} className="w-full py-4 bg-red-600 text-white font-bold rounded-xl"><RotateCcw className="inline mr-2"/> Iniciar Nueva Junta Directiva</button>
        </div>
      </GameContainer>
    );
  }

  if (isFinished) return <GameOver reward={game.xpReward} isAlreadyCompleted={isAlreadyCompleted} onComplete={onComplete} onBack={onBack} isPreviewMode={isPreviewMode} />;

  const currentScenario = game.data[step];

  return (
    <GameContainer game={game} onBack={onBack} isPreviewMode={isPreviewMode}>
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* RESOURCE BARS (Top) */}
        <div className="w-full grid grid-cols-3 gap-4 mb-8">
          <StatBar icon={Shield} color="text-green-400" bg="bg-green-500" value={stats.ethics} label="Ética" />
          <StatBar icon={DollarSign} color="text-yellow-400" bg="bg-yellow-500" value={stats.budget} label="Presupuesto" />
          <StatBar icon={Lightbulb} color="text-blue-400" bg="bg-blue-500" value={stats.tech} label="Innovación" />
        </div>

        {/* DILEMMA CARD */}
        <div className="w-full bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl mb-8 relative">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="w-24 h-24"/></div>
          <span className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-4 block">Decisión del CEO - Mes {step+1}</span>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed relative z-10">{currentScenario.situation}</p>
        </div>

        {/* OPTIONS OR FEEDBACK */}
        {!feedback ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentScenario.options.map((opt, i) => (
              <button key={i} onClick={() => handleChoice(opt.impacts, opt.feedback)} className="p-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-2xl text-left transition-all hover:scale-105 active:scale-95 group">
                 <p className="text-lg font-bold text-white mb-4">{opt.text}</p>
                 <div className="flex gap-3 text-xs font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                    {opt.impacts.ethics !== 0 && <span className={opt.impacts.ethics > 0 ? 'text-green-400' : 'text-red-400'}>{opt.impacts.ethics > 0 ? '+' : ''}{opt.impacts.ethics} Ética</span>}
                    {opt.impacts.budget !== 0 && <span className={opt.impacts.budget > 0 ? 'text-green-400' : 'text-red-400'}>{opt.impacts.budget > 0 ? '+' : ''}{opt.impacts.budget} Ppto</span>}
                    {opt.impacts.tech !== 0 && <span className={opt.impacts.tech > 0 ? 'text-green-400' : 'text-red-400'}>{opt.impacts.tech > 0 ? '+' : ''}{opt.impacts.tech} Innov.</span>}
                 </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full p-8 rounded-3xl border bg-slate-800/80 border-slate-600 text-center animate-in zoom-in duration-300">
            <h3 className="text-xl font-bold mb-4 text-white">Resultado Operativo</h3>
            <p className="text-slate-300 text-lg mb-8">{feedback.text}</p>
            <button onClick={nextStep} className="px-8 py-4 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-500 shadow-lg transition-colors">
              {feedback.fatal ? 'Ver Consecuencias' : 'Siguiente Mes'}
            </button>
          </div>
        )}
      </div>
    </GameContainer>
  );
}

// Auxiliar bar component para CEO
function StatBar({ icon: Icon, color, bg, value, label }) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex flex-col items-center">
       <Icon className={`w-6 h-6 mb-2 ${color} ${value < 25 ? 'animate-bounce' : ''}`} />
       <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden mb-1"><div className={`h-full transition-all duration-500 ${bg}`} style={{width:`${value}%`}}></div></div>
       <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
    </div>
  );
}

// ==========================================
// COMPONENTES AUXILIARES COMPARTIDOS
// ==========================================
function GameContainer({ game, onBack, isPreviewMode, children }) {
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 flex flex-col font-sans relative overflow-hidden">
      {/* Luces de fondo inmersivas */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <p className="text-xs text-pink-400 font-bold uppercase tracking-wider hidden sm:block">Laboratorio Arcade</p>
            <h2 className="text-white font-bold">{game.title}</h2>
          </div>
        </div>
        {isPreviewMode && (
          <div className="text-xs font-bold bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            MODO VISTA PREVIA
          </div>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center relative z-10">
        {children}
      </div>
    </div>
  );
}

function GameOver({ reward, isAlreadyCompleted, onComplete, onBack, isPreviewMode }) {
  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-6 text-center font-sans relative z-10">
      <div className={`bg-slate-900/80 border rounded-3xl p-10 max-w-lg w-full animate-in zoom-in duration-500 shadow-2xl backdrop-blur-xl ${isPreviewMode ? 'border-amber-500/30' : 'border-pink-500/30'}`}>
         <Trophy className={`w-24 h-24 mx-auto mb-6 ${isPreviewMode ? 'text-amber-400' : 'text-pink-400'}`} />
         <h2 className="text-3xl font-black text-white mb-2">¡Reto Superado!</h2>
         <p className="text-slate-400 mb-8">Has completado el simulador con éxito.</p>
         
         {!isPreviewMode && !isAlreadyCompleted ? (
           <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 mb-8 inline-block shadow-inner">
              <p className="text-xs text-slate-500 font-bold uppercase mb-1">Experiencia Ganada</p>
              <p className="text-4xl font-black text-pink-400">+{reward} <span className="text-xl text-pink-600">XP</span></p>
           </div>
         ) : isPreviewMode ? (
           <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/30 mb-8 max-w-sm mx-auto">
              <p className="text-amber-400 font-bold text-sm">Completaste la Vista Previa. Para ganar XP, vuelve al menú, completa la lección teórica requerida y juega de nuevo.</p>
           </div>
         ) : (
           <p className="text-green-400 mb-8 font-bold">Modo práctica: Ya reclamaste esta recompensa anteriormente.</p>
         )}

         <button onClick={() => { if (isAlreadyCompleted || isPreviewMode) onBack(); else onComplete(reward); }} className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg ${isPreviewMode ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-pink-600/20'}`}>
           {isAlreadyCompleted || isPreviewMode ? 'Volver al Laboratorio' : 'Reclamar Experiencia'}
         </button>
      </div>
    </div>
  );
}