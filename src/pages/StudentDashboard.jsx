import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Target, Trophy, LogOut, ChevronRight, Star, Shield, Zap, Lock, BookOpen, ArrowLeft, CheckCircle2, PlayCircle, RotateCcw, Gamepad2, BrainCircuit, Globe, Users } from 'lucide-react';
import { db, appId } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// IMPORTAR EL MOTOR DE JUEGOS
import { MemoryGameView, HangmanGameView, TimeAttackGameView, SortingGameView, PromptGameView, ScenarioGameView } from '../components/ArcadeGames';

/**
 * Configuración de rutas para los efectos de sonido.
 * Asegúrate de que los archivos estén en la carpeta public/assets/
 */
const SOUND_MAP = {
  success: '/assets/correct-answer.mp3',
  error:   '/assets/incorrect-answer.mp3',
  click:   '/assets/click-sound.mp3',
};

// Variable para controlar si hay algo sonando
let isPlaying = false;

/**
 * Reproduce un sonido solo si no hay otro sonido en reproducción.
 * @param {'success' | 'error' | 'click'} type - El identificador del sonido.
 */
const playSound = (type) => {
  // Si ya se está reproduciendo algo, ignoramos la solicitud
  if (isPlaying) {
    console.warn(`[Audio] Ignorado: El sonido "${type}" no se reprodujo porque ya hay uno activo.`);
    return;
  }

  const soundPath = SOUND_MAP[type];

  if (!soundPath) {
    console.error(`[Audio] Error: El sonido "${type}" no existe en el mapa.`);
    return;
  }

  const audio = new Audio(soundPath);

  // Activamos el bloqueo
  isPlaying = true;

  // Cuando termine el audio, liberamos el bloqueo
  audio.onended = () => {
    isPlaying = false;
  };

  // Manejo de errores en la reproducción
  audio.play().catch((err) => {
    console.error(`[Audio] Error al reproducir "${type}":`, err);
    isPlaying = false; // Liberamos en caso de fallo
  });
};


const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function StudentDashboard({ user, profile, onLogout, addExperience }) {
  const [activeTab, setActiveTab] = useState('inicio');
  const [leaderboard, setLeaderboard] = useState([]);
  const [silaboFirestore, setSilaboFirestore] = useState([]); 
  const [juegosFirestore, setJuegosFirestore] = useState([]); // JUEGOS EN LA NUBE
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false); 
  const [rankingFilter, setRankingFilter] = useState('general');

  const currentLevel = Math.floor((profile?.totalScore || 0) / 100) + 1;
  const xpForNextLevel = currentLevel * 100;
  const progressPercent = ((profile?.totalScore || 0) % 100) / 100 * 100;
  const completedMissions = profile?.completedMissions || [];

  useEffect(() => {
    // Escuchar Usuarios
    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'usuarios');
    const qUsers = query(usersRef, orderBy('totalScore', 'desc'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const topUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(u => u.role === 'estudiante');
      setLeaderboard(topUsers);
    });

    // Escuchar Sílabo
    const silaboRef = collection(db, 'artifacts', appId, 'public', 'data', 'silabo');
    const unsubSilabo = onSnapshot(silaboRef, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => doc.data());
        data.sort((a, b) => a.id.localeCompare(b.id));
        setSilaboFirestore(data);
        if (data.length > 0 && !expandedUnit) setExpandedUnit(data[0].id);
      }
    });

    // Escuchar Juegos
    const juegosRef = collection(db, 'artifacts', appId, 'public', 'data', 'juegos');
    const unsubJuegos = onSnapshot(juegosRef, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => doc.data());
        setJuegosFirestore(data);
      }
    });

    return () => { unsubUsers(); unsubSilabo(); unsubJuegos(); };
  }, []);

  const getTotalLessonsInUnit = (unit) => {
    if (!unit.sessions) return 0;
    return unit.sessions.reduce((total, session) => total + (session.lessons ? session.lessons.length : 0), 0);
  };

  const getFlatLessons = () => {
    let allLessons = [];
    silaboFirestore.forEach(u => {
      if(u.sessions) {
         u.sessions.forEach(s => {
           if(s.lessons) {
             s.lessons.forEach(l => allLessons.push(l));
           }
         })
      }
    });
    return allLessons;
  };
  const flatLessonsList = getFlatLessons();

  const handleLessonComplete = (xpGained, missionId) => {
    playSound('success'); 
    addExperience(xpGained, missionId);
    setActiveLesson(null);
    setActiveGame(null);
  };

  if (activeLesson) {
    const isAlreadyCompleted = completedMissions.includes(activeLesson.id);
    return (
      <LessonImmersiveView 
        lesson={activeLesson} 
        onBack={() => { playSound('click'); setActiveLesson(null); }} 
        onComplete={(xp) => handleLessonComplete(xp, activeLesson.id)} 
        isAlreadyCompleted={isAlreadyCompleted}
      />
    );
  }

  // RENDERIZADO DINÁMICO DE LOS JUEGOS ARCADE
  if (activeGame) {
    const isAlreadyCompleted = completedMissions.includes(activeGame.id);
    const gameProps = {
      game: activeGame,
      onBack: () => { 
        playSound('click'); 
        setActiveGame(null); 
        setIsPreviewMode(false); 
      },
      onComplete: (xp) => {
        if (isPreviewMode) {
          playSound('click'); setActiveGame(null); setIsPreviewMode(false);
        } else {
          handleLessonComplete(xp, activeGame.id);
        }
      },
      isAlreadyCompleted,
      isPreviewMode 
    };

    switch (activeGame.type) {
      case 'memory': return <MemoryGameView {...gameProps} />;
      case 'hangman': return <HangmanGameView {...gameProps} />;
      case 'timeattack': return <TimeAttackGameView {...gameProps} />;
      case 'sorting': return <SortingGameView {...gameProps} />;
      case 'prompt': return <PromptGameView {...gameProps} />;
      case 'scenario': return <ScenarioGameView {...gameProps} />;
      default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 flex overflow-hidden font-sans">
      <aside className="w-64 bg-slate-900/50 border-r border-white/5 flex flex-col justify-between hidden md:flex backdrop-blur-md">
        <div>
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">EMERIA</h1>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Estudiante</p>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <SidebarBtn icon={<LayoutDashboard/>} label="Inicio" isActive={activeTab==='inicio'} onClick={()=>{playSound('click'); setActiveTab('inicio')}} />
            <SidebarBtn icon={<Target/>} label="Misiones" isActive={activeTab==='misiones'} onClick={()=>{playSound('click'); setActiveTab('misiones')}} />
            <SidebarBtn icon={<Gamepad2/>} label="Laboratorio" isActive={activeTab==='laboratorio'} onClick={()=>{playSound('click'); setActiveTab('laboratorio')}} />
            <SidebarBtn icon={<Trophy/>} label="Ranking" isActive={activeTab==='ranking'} onClick={()=>{playSound('click'); setActiveTab('ranking')}} />
          </nav>
        </div>
        <div className="p-4 border-t border-white/5">
           <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-white/5">
              <p className="text-white font-bold text-sm truncate">{profile?.name || 'Estudiante'}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-blue-400 font-bold">Nivel {currentLevel}</span>
                <span className="text-xs text-yellow-400 flex items-center gap-1"><Star className="w-3 h-3 fill-current"/> {profile?.totalScore || 0}</span>
              </div>
           </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors font-medium"><LogOut className="w-5 h-5" /> Cerrar Sesión</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <header className="md:hidden bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
           <div className="flex items-center gap-2"><Zap className="text-blue-500 w-6 h-6" /><span className="text-white font-bold text-lg">EMERIA</span></div>
           <button onClick={onLogout} className="text-slate-400 hover:text-white"><LogOut className="w-6 h-6"/></button>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full relative z-10">
          <div className="md:hidden grid grid-cols-4 gap-1 bg-slate-900/50 p-1 rounded-xl mb-6 border border-white/5">
             <MobileTabBtn label="Inicio" isActive={activeTab==='inicio'} onClick={()=>setActiveTab('inicio')} />
             <MobileTabBtn label="Misiones" isActive={activeTab==='misiones'} onClick={()=>setActiveTab('misiones')} />
             <MobileTabBtn label="Juegos" isActive={activeTab==='laboratorio'} onClick={()=>setActiveTab('laboratorio')} />
             <MobileTabBtn label="Ranking" isActive={activeTab==='ranking'} onClick={()=>setActiveTab('ranking')} />
          </div>

          {activeTab === 'inicio' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/80 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                    <span className="text-5xl font-black text-blue-500 opacity-50">{profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-white mb-2">{profile?.name || 'Estudiante Universitario'}</h2>
                    <p className="text-slate-400 mb-6">{profile?.course || 'Curso no asignado'}</p>
                    <div className="bg-slate-950 rounded-full h-4 w-full border border-white/5 overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 relative" style={{ width: `${progressPercent}%` }}>
                         <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-bold mt-2">
                      <span className="text-blue-400">NIVEL {currentLevel}</span>
                      <span className="text-slate-400">{profile?.totalScore || 0} / {xpForNextLevel} XP</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Star className="w-6 h-6 text-yellow-400" />} title="XP Total" value={profile?.totalScore || 0} />
                <StatCard icon={<Shield className="w-6 h-6 text-blue-400" />} title="Nivel" value={currentLevel} />
                <StatCard icon={<BookOpen className="w-6 h-6 text-green-400" />} title="Misiones" value={`${completedMissions.filter(id => flatLessonsList.some(l => l.id === id)).length}/${flatLessonsList.length}`} />
                <StatCard icon={<Trophy className="w-6 h-6 text-purple-400" />} title="Rango" value={`#${leaderboard.findIndex(u => u.id === profile?.uid) + 1 || '-'}`} />
              </div>
            </div>
          )}

          {activeTab === 'misiones' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Target className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Ruta de Aprendizaje</h2>
                  <p className="text-slate-400 text-sm">Completa la teoría para desbloquear la práctica.</p>
                </div>
              </div>

              <div className="space-y-4">
                {silaboFirestore.map((unidad, index) => (
                  <div key={unidad.id || index} className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
                    <button onClick={() => { playSound('click'); setExpandedUnit(expandedUnit === unidad.id ? null : unidad.id); }} className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${expandedUnit === unidad.id ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-400 border border-white/5'}`}>
                          {index + 1}
                        </div>
                        <div className="text-left max-w-[200px] sm:max-w-md md:max-w-lg lg:max-w-2xl">
                          <h3 className="text-white font-bold truncate">{unidad.title}</h3>
                          <p className="text-slate-500 text-xs mt-1">{getTotalLessonsInUnit(unidad)} misiones</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${expandedUnit === unidad.id ? 'rotate-90 text-blue-400' : ''}`} />
                    </button>
                    
                    {expandedUnit === unidad.id && unidad.sessions && (
                      <div className="bg-slate-950/80 p-6 border-t border-white/5 space-y-6">
                        <p className="text-sm text-slate-400 italic mb-4">{unidad.description}</p>
                        {unidad.sessions.map((session, sIdx) => (
                          <div key={session.id || sIdx} className="space-y-3">
                            <h4 className="text-blue-400 font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2">{session.name}</h4>
                            {session.lessons && session.lessons.map((lesson) => {
                              const lessonIndex = flatLessonsList.findIndex(l => l.id === lesson.id);
                              const isFirstLesson = lessonIndex === 0;
                              const previousLesson = lessonIndex > 0 ? flatLessonsList[lessonIndex - 1] : null;
                              const hasCompletedPrevious = previousLesson ? completedMissions.includes(previousLesson.id) : false;
                              const isUnlocked = isFirstLesson || hasCompletedPrevious || lesson.isUnlocked;
                              const isCompleted = completedMissions.includes(lesson.id);

                              let cardStyle = "bg-slate-900/50 border-white/5 opacity-75";
                              let iconStyle = "bg-slate-800 text-slate-600";
                              let icon = <Lock className="w-4 h-4" />;
                              if (isCompleted) { cardStyle = "bg-slate-900/80 border-green-500/30"; iconStyle = "bg-green-500/20 text-green-400"; icon = <CheckCircle2 className="w-4 h-4" />; } 
                              else if (isUnlocked) { cardStyle = "bg-slate-900 border-blue-500/30 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]"; iconStyle = "bg-blue-500/20 text-blue-400"; icon = <PlayCircle className="w-4 h-4" />; }

                              return (
                                <div key={lesson.id} className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all gap-4 ${cardStyle}`}>
                                  <div className="flex items-center gap-4">
                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconStyle}`}>{icon}</div>
                                     <div>
                                       <span className={`block text-sm font-medium ${isUnlocked || isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>{lesson.title}</span>
                                       <span className={`text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'text-green-500' : 'text-yellow-500'}`}>{isCompleted ? 'Completado' : `+${lesson.xpReward || 0} XP`}</span>
                                     </div>
                                  </div>
                                  <button onClick={() => { playSound('click'); setActiveLesson(lesson); }} disabled={!isUnlocked && !isCompleted} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${isCompleted ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : isUnlocked ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
                                    {isCompleted ? <span className="flex items-center gap-1"><RotateCcw className="w-4 h-4"/> Repasar</span> : isUnlocked ? 'Iniciar Misión' : 'Bloqueado'}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
             </div>
          )}

          {activeTab === 'laboratorio' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20">
                  <Gamepad2 className="text-pink-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Laboratorio Arcade</h2>
                  <p className="text-slate-400 text-sm">Entrena tus habilidades y gana experiencia extra con estos {juegosFirestore.length} simuladores.</p>
                </div>
              </div>

              {juegosFirestore.length === 0 ? (
                <div className="text-center p-10 bg-slate-900/50 rounded-2xl border border-white/5 text-slate-400">
                  Aún no hay simuladores disponibles en la base de datos.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {juegosFirestore.map((game) => {
                    const isCompleted = completedMissions.includes(game.id);
                    // Si requiredLessonId existe y no está vacío, verificar si está completado. Si no existe, está desbloqueado por defecto.
                    const isUnlocked = !game.requiredLessonId || completedMissions.includes(game.requiredLessonId) || isCompleted;

                    return (
                      <div key={game.id} className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 flex flex-col relative overflow-hidden group">
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                             <Lock className="w-10 h-10 text-slate-600 mb-3" />
                             <p className="text-white font-bold mb-1">Simulador Bloqueado</p>
                             <p className="text-xs text-slate-400 mb-4">Debes completar la misión:<br/> <span className="text-blue-400 font-bold">{game.requiredLessonName}</span></p>
                             <button onClick={(e) => { e.stopPropagation(); playSound('click'); setIsPreviewMode(true); setActiveGame(game); }} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-white/10 transition-colors shadow-lg">
                               Jugar Vista Previa (Sin XP)
                             </button>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-pink-500/50 transition-colors">
                            <BrainCircuit className="w-6 h-6 text-pink-400" />
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isCompleted ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                             {isCompleted ? <CheckCircle2 className="w-3 h-3"/> : <Star className="w-3 h-3 fill-current"/>}
                             {isCompleted ? 'Completado' : `+${game.xpReward} XP`}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 flex-1">{game.description}</p>
                        <button onClick={() => { playSound('click'); setIsPreviewMode(false); setActiveGame(game); }} disabled={!isUnlocked} className={`w-full py-3 rounded-xl font-bold transition-all ${isCompleted ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-pink-600 text-white hover:bg-pink-500 shadow-lg shadow-pink-600/20'}`}>
                          {isCompleted ? 'Jugar de Nuevo' : 'Iniciar Simulador'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ranking' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                 <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                    <Trophy className="text-purple-400 w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Salón de la Fama</h2>
                    <p className="text-slate-400 text-sm">Compite con tus compañeros.</p>
                  </div>
                 </div>
                 <div className="flex bg-slate-900 border border-white/5 p-1 rounded-xl w-full sm:w-auto shadow-lg">
                    <button onClick={() => { playSound('click'); setRankingFilter('general'); }} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${rankingFilter === 'general' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Globe className="w-4 h-4" /> General</button>
                    <button onClick={() => { playSound('click'); setRankingFilter('curso'); }} disabled={!profile?.course} title={!profile?.course ? "No tienes un curso asignado" : ""} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${!profile?.course ? 'opacity-50 cursor-not-allowed' : rankingFilter === 'curso' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Users className="w-4 h-4" /> Mi Curso</button>
                 </div>
              </div>

              <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-900">
                  <div className="col-span-2 text-center">Rango</div>
                  <div className="col-span-7">Estudiante</div>
                  <div className="col-span-3 text-right">XP</div>
                </div>
                <div className="divide-y divide-white/5">
                  {(() => {
                    const filteredLeaderboard = rankingFilter === 'curso' && profile?.course ? leaderboard.filter(u => u.course === profile.course) : leaderboard;
                    if (filteredLeaderboard.length === 0) return <div className="p-8 text-center text-slate-500">No hay estudiantes en esta categoría aún.</div>;
                    return filteredLeaderboard.map((userDoc, index) => {
                      const isMe = userDoc.id === profile?.uid;
                      let rankClass = "text-slate-400 font-bold text-lg";
                      if (index === 0) rankClass = "text-yellow-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
                      if (index === 1) rankClass = "text-slate-300 font-black text-xl";
                      if (index === 2) rankClass = "text-amber-600 font-black text-lg";

                      return (
                        <div key={userDoc.id} className={`p-4 grid grid-cols-12 gap-4 items-center transition-colors ${isMe ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'hover:bg-white/5 border-l-4 border-transparent'}`}>
                          <div className={`col-span-2 text-center ${rankClass}`}>#{index + 1}</div>
                          <div className="col-span-7 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isMe ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{userDoc.name ? userDoc.name.charAt(0).toUpperCase() : '?'}</div>
                            <div>
                              <p className={`font-bold ${isMe ? 'text-blue-400' : 'text-slate-200'}`}>{userDoc.name || 'Anónimo'} {isMe && '(Tú)'}</p>
                              <p className="text-xs text-slate-500 truncate">{userDoc.course || 'Estudiante'}</p>
                            </div>
                          </div>
                          <div className={`col-span-3 text-right font-mono font-bold ${isMe ? 'text-blue-400' : 'text-yellow-400'}`}>{userDoc.totalScore || 0} XP</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarBtn({ icon, label, isActive, onClick }) { return ( <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}> <span className="w-5 h-5">{icon}</span> {label} </button> ); }
function MobileTabBtn({ label, isActive, onClick }) { return ( <button onClick={onClick} className={`flex-1 py-2 text-xs font-bold rounded-lg truncate px-1 transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>{label}</button> ); }
function StatCard({ icon, title, value }) { return ( <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-white/10 transition-colors"><div className="mb-2">{icon}</div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{title}</p><p className="text-xl font-black text-white">{value}</p></div> ); }

function LessonImmersiveView({ lesson, onBack, onComplete, isAlreadyCompleted }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const hasContent = lesson.content && lesson.content.length > 0;
  const hasQuiz = lesson.quiz && lesson.quiz.length > 0;
  
  if (!hasContent && !hasQuiz) {
    return (
      <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-6 text-center">
        <Target className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-2">Misión: {lesson.title}</h2>
        <p className="text-slate-400 mb-8 max-w-md">Lee el documento adjunto o completa la tarea asignada.</p>
        <div className="flex gap-4">
          <button onClick={onBack} className="px-6 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700">Volver</button>
          {!isAlreadyCompleted && ( <button onClick={() => { playSound('success'); onComplete(lesson.xpReward); }} className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500">Completar (+{lesson.xpReward} XP)</button> )}
        </div>
      </div>
    );
  }

  const currentQuestion = hasQuiz ? lesson.quiz[currentQuizIndex] : null;

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    if (selectedOption === currentQuestion.correctAnswer) { setQuizScore(prev => prev + 1); playSound('success'); } 
    else { playSound('error'); }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < lesson.quiz.length - 1) { setCurrentQuizIndex(prev => prev + 1); setSelectedOption(null); setIsAnswerChecked(false); } 
    else setIsFinished(true);
  };

  const handleRetryQuiz = () => { playSound('click'); setCurrentQuizIndex(0); setQuizScore(0); setSelectedOption(null); setIsAnswerChecked(false); setIsFinished(false); };
  const perfectScore = hasQuiz ? (quizScore === lesson.quiz.length) : true;
  const passed = isAlreadyCompleted || perfectScore;

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 flex flex-col font-sans relative">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <div className="hidden sm:block">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">{isAlreadyCompleted ? 'Modo Repaso' : 'Misión en curso'}</p>
            <h2 className="text-white font-bold truncate max-w-sm">{lesson.title}</h2>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-12 pb-24">
          {hasContent && !isFinished && (
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
               {lesson.content.map((block, idx) => {
                 if (block.type === 'subtitle') return <h3 key={idx} className="text-xl md:text-2xl font-bold text-white border-b border-white/10 pb-2 mt-8">{block.value}</h3>;
                 if (block.type === 'text') return <p key={idx} className="text-slate-300 leading-relaxed text-lg">{block.value}</p>;
                 if (block.type === 'list') return <ul key={idx} className="space-y-3 bg-slate-950/50 p-6 rounded-xl border border-white/5">{block.items.map((item, i) => (<li key={i} className="flex gap-3 text-slate-300 leading-relaxed"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>;
                 if (block.type === 'youtube') {
                   const videoId = getYouTubeId(block.url);
                   return videoId ? <div key={idx} className="w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/10 relative shadow-lg my-6"><iframe className="w-full h-full absolute top-0 left-0" src={`https://www.youtube.com/embed/${videoId}?rel=0`} title="YouTube" frameBorder="0" allowFullScreen></iframe></div> : null;
                 }
                 return null;
               })}
            </div>
          )}

          {hasQuiz && !isFinished && (
            <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/50 border border-blue-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
               <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-tight">{currentQuestion.question}</p>
               <div className="space-y-3">
                 {currentQuestion.options.map((option, idx) => {
                   let cardClass = "bg-slate-800/50 border-white/10 text-slate-300";
                   if (isAnswerChecked) {
                     if (idx === currentQuestion.correctAnswer) cardClass = "bg-green-500/20 border-green-500 text-green-300"; 
                     else if (idx === selectedOption) cardClass = "bg-red-500/20 border-red-500 text-red-300"; 
                   } else if (selectedOption === idx) cardClass = "bg-blue-600 border-blue-400 text-white"; 
                   return <button key={idx} disabled={isAnswerChecked} onClick={() => { playSound('click'); setSelectedOption(idx); }} className={`w-full text-left p-5 rounded-xl border-2 transition-all font-medium ${cardClass}`}>{option}</button>;
                 })}
               </div>
               <div className="mt-8 flex justify-end">
                 {!isAnswerChecked ? <button onClick={handleCheckAnswer} disabled={selectedOption === null} className="px-8 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50">Verificar</button> : <button onClick={handleNextQuestion} className="px-8 py-3 rounded-xl font-bold bg-white text-slate-900">Siguiente</button>}
               </div>
            </div>
          )}

          {isFinished && (
            <div className={`bg-slate-900/80 border rounded-3xl p-10 text-center max-w-lg mx-auto ${!passed ? 'border-red-500/30' : 'border-blue-500/30'}`}>
               <h2 className="text-3xl font-black text-white mb-2">{isAlreadyCompleted ? 'Repaso Listo' : (perfectScore ? '¡Misión Superada!' : 'Reto Fallido')}</h2>
               <p className="text-slate-400 mb-8">Acertaste {quizScore} de {lesson.quiz.length} preguntas.</p>
               <div className="flex flex-col gap-4 w-full">
                 {!passed ? <button onClick={handleRetryQuiz} className="w-full py-4 rounded-xl font-black text-white bg-red-600">Reintentar Reto</button> : <button onClick={() => { if (isAlreadyCompleted) onBack(); else onComplete(lesson.xpReward || 0); }} className="w-full py-4 rounded-xl font-black text-white bg-blue-600">Reclamar Recompensa</button>}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}